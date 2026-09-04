import type { Ticket } from "@/types/ticket";

export function getTicketId(ticket: Ticket): number {
  return ticket.id ?? ticket.ticketId ?? NaN;
}
