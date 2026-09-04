import type { AdminTicket } from "@/types/ticket";

export function getAdminTicketId(ticket: AdminTicket): number {
  return ticket.id ?? ticket.ticketId ?? NaN;
}

export function getAdminTicketAuthorName(ticket: AdminTicket): string {
  return ticket.authorName ?? ticket.student?.fullname ?? "Naməlum tələbə";
}
