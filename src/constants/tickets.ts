import type { BadgeProps } from "@/components/ui/badge";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export const TICKET_STATUSES = ["Gözləmədə", "Baxılır", "Həll olundu"] as const;

export const TICKET_STATUS_BADGE_VARIANT: Record<string, BadgeVariant> = {
  "Gözləmədə": "warning",
  "Baxılır": "accent",
  "Həll olundu": "success",
};

export const DEFAULT_TICKET_STATUS_BADGE_VARIANT: BadgeVariant = "default";

// Backend priority enum-u hələ təsdiqlənməyib (FAZA G) — real dəyərlər gələndə
// yalnız bu massiv doldurulacaq, dropdown/filtr/forma avtomatik aktiv olacaq.
export const TICKET_PRIORITIES: string[] = [];

export const TICKET_PRIORITY_BADGE_VARIANT: Record<string, BadgeVariant> = {};

export const DEFAULT_TICKET_PRIORITY_BADGE_VARIANT: BadgeVariant = "default";
