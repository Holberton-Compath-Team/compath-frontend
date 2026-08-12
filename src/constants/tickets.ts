import type { BadgeProps } from "@/components/ui/badge";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export const TICKET_STATUS_BADGE_VARIANT: Record<string, BadgeVariant> = {
  "Gözləmədə": "warning",
  "Baxılır": "accent",
  "Həll olundu": "success",
};

export const DEFAULT_TICKET_STATUS_BADGE_VARIANT: BadgeVariant = "default";
