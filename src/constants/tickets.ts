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

export const TICKET_PRIORITIES: string[] = ["Aşağı", "Orta", "Yüksək", "Təcili"];

export const DEFAULT_TICKET_PRIORITY = "Orta";

export const TICKET_PRIORITY_BADGE_VARIANT: Record<string, BadgeVariant> = {
  "Aşağı": "default",
  "Orta": "accent",
  "Yüksək": "warning",
  "Təcili": "danger",
  // Backend bəzən ingiliscə prioritet dəyərləri qaytarır — sabitləşənə qədər
  // ehtimal olunan variantlar da əlavə olunur.
  low: "default",
  medium: "accent",
  high: "warning",
  urgent: "danger",
};

export const DEFAULT_TICKET_PRIORITY_BADGE_VARIANT: BadgeVariant = "accent";

// Ekranda göstərilən mətn — backend ingiliscə/naməlum/boş dəyər qaytarsa belə
// istifadəçi həmişə Azərbaycanca prioritet görür, naməlum dəyər "Orta" sayılır.
export const TICKET_PRIORITY_LABEL: Record<string, string> = {
  "Aşağı": "Aşağı",
  "Orta": "Orta",
  "Yüksək": "Yüksək",
  "Təcili": "Təcili",
  low: "Aşağı",
  medium: "Orta",
  high: "Yüksək",
  urgent: "Təcili",
};

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
