import { GraduationCap, HeartHandshake, Landmark } from "lucide-react";

import {
  ACADEMIC_SERVICE_NAME,
  ADMINISTRATIVE_FINANCE_SERVICE_NAME,
} from "@/constants/tickets";
import type {
  NeedCategory,
  NeedCategoryId,
  NeedOption,
  NeedTopic,
  StudentStatus,
  UrgencyLevel,
} from "@/types/needs-assessment";

export const NEED_DESCRIPTION_MAX_LENGTH = 300;

export const NEED_CATEGORIES: NeedCategory[] = [
  { id: "academic", label: ACADEMIC_SERVICE_NAME, icon: GraduationCap },
  { id: "administrative", label: ADMINISTRATIVE_FINANCE_SERVICE_NAME, icon: Landmark },
  { id: "sensitive", label: "Şəxsi-həssas", icon: HeartHandshake },
];

export const NEED_TOPICS: NeedTopic[] = [
  {
    id: "registration",
    categoryId: "academic",
    label: "Qeydiyyat",
    keywords: ["qeydiyyat", "kurs", "fənn", "semestr"],
  },
  {
    id: "exam",
    categoryId: "academic",
    label: "İmtahan",
    keywords: ["imtahan", "bal", "qiymət", "buraxılış"],
  },
  {
    id: "attendance",
    categoryId: "academic",
    label: "Davamiyyət",
    keywords: ["davamiyyət", "dərs", "qayıb", "iclas"],
  },
  {
    id: "academic-advice",
    categoryId: "academic",
    label: "Akademik məsləhət",
    keywords: ["məsləhət", "transfer", "ixtisas", "köçürmə"],
  },
  {
    id: "payment",
    categoryId: "administrative",
    label: "Ödəniş",
    keywords: ["ödəniş", "kontrakt", "borc", "bank"],
  },
  {
    id: "scholarship",
    categoryId: "administrative",
    label: "Təqaüd",
    keywords: ["təqaüd", "sosial", "güzəşt"],
  },
  {
    id: "document",
    categoryId: "administrative",
    label: "Sənəd",
    keywords: ["arayış", "sənəd", "transkript", "diplom"],
  },
  {
    id: "military",
    categoryId: "administrative",
    label: "Hərbi uçot",
    keywords: ["hərbi", "komissarlıq", "əsgəri"],
  },
  {
    id: "stress",
    categoryId: "sensitive",
    label: "Narahatlıq/stress",
    keywords: ["stress", "narahat", "təzyiq", "yorğun"],
  },
  {
    id: "danger",
    categoryId: "sensitive",
    label: "Zorakılıq/təhlükə",
    keywords: ["zorakılıq", "təhlükə", "hədə", "təcavüz"],
    urgent: true,
  },
  {
    id: "financial-hardship",
    categoryId: "sensitive",
    label: "Maddi çətinlik",
    keywords: ["pul", "ehtiyac", "yoxsul", "kirayə"],
  },
  {
    id: "other",
    categoryId: "sensitive",
    label: "Digər",
    keywords: ["digər", "başqa"],
  },
];

export const DANGER_KEYWORDS: string[] = NEED_TOPICS.filter((topic) => topic.urgent).flatMap(
  (topic) => topic.keywords,
);

export const URGENCY_OPTIONS: NeedOption<UrgencyLevel>[] = [
  { id: "not_urgent", label: "Təcili deyil" },
  { id: "few_days", label: "Bir neçə günə" },
  { id: "today", label: "Bu gün lazımdır" },
];

export const STATUS_OPTIONS: NeedOption<StudentStatus>[] = [
  { id: "student", label: "Tələbə" },
  { id: "graduate", label: "Məzun" },
];

export const STATUS_LABEL: Record<StudentStatus, string> = {
  student: "Tələbə",
  graduate: "Məzun",
};

// 3 təcililik səviyyəsi 4 prioritet dəyərinə düşür: təhlükə əlaməti aşkarlansa
// səviyyədən asılı olmayaraq "Təcili" seçilir (bax suggestPriority).
export const URGENCY_TO_PRIORITY: Record<UrgencyLevel, string> = {
  not_urgent: "Aşağı",
  few_days: "Orta",
  today: "Yüksək",
};

export const DANGER_PRIORITY = "Təcili";

export function getTopicsForCategory(categoryId: NeedCategoryId): NeedTopic[] {
  return NEED_TOPICS.filter((topic) => topic.categoryId === categoryId);
}

export function getCategoryKeywords(categoryId: NeedCategoryId): string[] {
  return getTopicsForCategory(categoryId).flatMap((topic) => topic.keywords);
}
