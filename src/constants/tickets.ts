import type { BadgeProps } from "@/components/ui/badge";
import type { TicketMessage } from "@/types/ticket";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export const TICKET_STATUSES = ["Gözləmədə", "Baxılır", "Həll olundu"] as const;

export const TICKET_STATUS_BADGE_VARIANT: Record<string, BadgeVariant> = {
  "Gözləmədə": "warning",
  "Baxılır": "accent",
  "Həll olundu": "success",
  // Backend bəzən ingiliscə status dəyərləri qaytarır (bax CLAUDE.md — backendə
  // bildirilib, sabitləşənə qədər ehtimal olunan variantlar da əlavə olunur).
  pending: "warning",
  in_progress: "accent",
  inProgress: "accent",
  resolved: "success",
};

export const DEFAULT_TICKET_STATUS_BADGE_VARIANT: BadgeVariant = "default";

// Ekranda göstərilən mətn — backend ingiliscə/naməlum dəyər qaytarsa belə
// istifadəçi həmişə Azərbaycanca status görür. AZ dəyərlər özlərinə map olunur.
export const TICKET_STATUS_LABEL: Record<string, string> = {
  "Gözləmədə": "Gözləmədə",
  "Baxılır": "Baxılır",
  "Həll olundu": "Həll olundu",
  pending: "Gözləmədə",
  in_progress: "Baxılır",
  inProgress: "Baxılır",
  resolved: "Həll olundu",
};

export const TICKET_MESSAGE_BUBBLE_CLASS: Record<TicketMessage["sender_role"], string> = {
  student: "bg-ku-green-soft/40",
  admin: "bg-background",
};

// Backend priority enum-u hələ təsdiqlənməyib (FAZA G) — real dəyərlər gələndə
// yalnız bu massiv doldurulacaq, dropdown/filtr/forma avtomatik aktiv olacaq.
export const TICKET_PRIORITIES: string[] = [];

export const TICKET_PRIORITY_BADGE_VARIANT: Record<string, BadgeVariant> = {};

export const DEFAULT_TICKET_PRIORITY_BADGE_VARIANT: BadgeVariant = "default";

// Xidmət Kataloqundan gələn dəqiq adlar — FAQ Accordion və dinamik sahələr
// bu adlarla (trim, case-sensitive) müqayisə olunur.
export const ACADEMIC_SERVICE_NAME = "Akademik";
export const ADMINISTRATIVE_FINANCE_SERVICE_NAME = "İnzibati-Maliyyə";

export const DOCUMENT_TYPES = [
  "Tələbə arayışı",
  "Transkript",
  "Hərbi komissarlıq üçün arayış",
  "Təqaüd barədə çıxarış",
] as const;

export const EDUCATION_FORMS = ["Ödənişli", "Dövlət sifarişli"] as const;
