import { DANGER_KEYWORDS, DANGER_PRIORITY, URGENCY_TO_PRIORITY, getCategoryKeywords } from "@/constants/needs-assessment";
import type { MatchResult, NeedCategoryId, UrgencyLevel } from "@/types/needs-assessment";
import type { Service } from "@/types/service";

const AZ_DIACRITIC_MAP: Record<string, string> = {
  ə: "e",
  ı: "i",
  ş: "s",
  ç: "c",
  ğ: "g",
  ö: "o",
  ü: "u",
};

const MIN_PREFIX_LENGTH = 3;

export function normalizeAz(text: string): string {
  return text
    .toLocaleLowerCase("az")
    .split("")
    .map((char) => AZ_DIACRITIC_MAP[char] ?? char)
    .join("")
    .trim();
}

export function tokenizeAz(text: string): string[] {
  return normalizeAz(text)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 0);
}

// Qısa köklər ("yataqxan") tam sözlərə ("yataqxana", "yataqxanada") uyğunlaşır.
// 3 simvoldan qısa tokenlər üçün yalnız tam uyğunluq qəbul olunur, əks halda
// "və", "ya" kimi sözlər səhv uyğunluq yaradır.
function keywordMatchesToken(keyword: string, token: string): boolean {
  if (keyword.length < MIN_PREFIX_LENGTH || token.length < MIN_PREFIX_LENGTH) {
    return keyword === token;
  }

  return token.startsWith(keyword) || keyword.startsWith(token);
}

export function hasDangerSignal(keywords: string[], freeText: string): boolean {
  const tokens = [...keywords.map(normalizeAz), ...tokenizeAz(freeText)];
  const dangerTokens = DANGER_KEYWORDS.map(normalizeAz);

  return dangerTokens.some((danger) => tokens.some((token) => keywordMatchesToken(danger, token)));
}

export function inferCategoryFromText(
  freeText: string,
  categories: NeedCategoryId[],
): NeedCategoryId | null {
  const tokens = tokenizeAz(freeText);
  if (tokens.length === 0) return null;

  let bestCategory: NeedCategoryId | null = null;
  let bestScore = 0;

  for (const categoryId of categories) {
    const keywords = getCategoryKeywords(categoryId).map(normalizeAz);
    const score = keywords.filter((keyword) =>
      tokens.some((token) => keywordMatchesToken(keyword, token)),
    ).length;

    if (score > bestScore) {
      bestScore = score;
      bestCategory = categoryId;
    }
  }

  return bestCategory;
}

export function matchServices(keywords: string[], freeText: string, services: Service[]): MatchResult[] {
  const normalizedKeywords = Array.from(
    new Set([...keywords.map(normalizeAz), ...tokenizeAz(freeText)]),
  );

  if (normalizedKeywords.length === 0) return [];

  const results = services.map((service) => {
    const serviceTokens = tokenizeAz(`${service.name} ${service.description}`);
    const matchedKeywords = normalizedKeywords.filter((keyword) =>
      serviceTokens.some((token) => keywordMatchesToken(keyword, token)),
    );

    return { service, score: matchedKeywords.length, matchedKeywords };
  });

  return results.filter((result) => result.score > 0).sort((a, b) => b.score - a.score);
}

export function suggestPriority(urgency: UrgencyLevel, isDanger: boolean): string {
  return isDanger ? DANGER_PRIORITY : URGENCY_TO_PRIORITY[urgency];
}

export function buildTicketDescription(
  freeText: string,
  topicLabel: string | null,
  statusLabel: string,
): string {
  const lines: string[] = [];
  const trimmedText = freeText.trim();

  if (trimmedText) {
    lines.push(trimmedText);
  } else if (topicLabel) {
    lines.push(`Mövzu: ${topicLabel}`);
  }

  lines.push(`Status: ${statusLabel}`);

  return lines.join("\n");
}
