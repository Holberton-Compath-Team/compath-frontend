import type { BadgeProps } from "@/components/ui/badge";
import {
  DEFAULT_TICKET_PRIORITY,
  DEFAULT_TICKET_PRIORITY_BADGE_VARIANT,
  TICKET_PRIORITY_BADGE_VARIANT,
  TICKET_PRIORITY_LABEL,
} from "@/constants/tickets";
import type { Ticket, TicketMessage } from "@/types/ticket";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export function getTicketId(ticket: Ticket): string {
  return String(ticket.id ?? ticket.ticketId ?? "");
}

export function getTicketMessageTicketId(message: TicketMessage): string {
  return String(message.ticketId ?? message.ticket_id ?? "");
}

export function getTicketPriorityLabel(priority?: string): string {
  if (!priority) {
    return DEFAULT_TICKET_PRIORITY;
  }
  return TICKET_PRIORITY_LABEL[priority] ?? DEFAULT_TICKET_PRIORITY;
}

export function getTicketPriorityBadgeVariant(priority?: string): BadgeVariant {
  if (!priority) {
    return DEFAULT_TICKET_PRIORITY_BADGE_VARIANT;
  }
  return TICKET_PRIORITY_BADGE_VARIANT[priority] ?? DEFAULT_TICKET_PRIORITY_BADGE_VARIANT;
}
