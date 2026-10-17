import type { Ticket, TicketMessage } from "@/types/ticket";

export function getTicketId(ticket: Ticket): string {
  return String(ticket.id ?? ticket.ticketId ?? "");
}

export function getTicketMessageTicketId(message: TicketMessage): string {
  return String(message.ticketId ?? message.ticket_id ?? "");
}
