import type { AdminTicket } from "@/types/ticket";

export function getAdminTicketId(ticket: AdminTicket): string {
  return String(ticket.id ?? ticket.ticketId ?? "");
}

export function getAdminTicketAuthorName(ticket: AdminTicket): string {
  return ticket.student?.fullname ?? ticket.authorName ?? "Naməlum tələbə";
}
