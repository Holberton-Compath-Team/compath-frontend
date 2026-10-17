import { apiClient } from "@/lib/api-client";
import type {
  AdminTicket,
  CreateTicketPayload,
  CreateTicketResponse,
  Ticket,
  TicketMessage,
} from "@/types/ticket";

export async function getTickets(): Promise<Ticket[]> {
  return apiClient.get<Ticket[]>("/tickets");
}


export async function getAllTickets(): Promise<AdminTicket[]> {
  return apiClient.get<AdminTicket[]>("/tickets/all");
}

export async function createTicket(
  payload: CreateTicketPayload,
): Promise<CreateTicketResponse> {
  return apiClient.post<CreateTicketResponse>("/tickets", payload);
}

export async function updateTicketStatus(id: string, status: string): Promise<unknown> {
  return apiClient.put<unknown>(`/tickets/${encodeURIComponent(id)}`, { status });
}

export async function deleteTicket(id: string): Promise<unknown> {
  return apiClient.delete<unknown>(`/tickets/${encodeURIComponent(id)}`);
}

export async function getTicketMessages(ticketId: string): Promise<TicketMessage[]> {
  return apiClient.get<TicketMessage[]>(`/tickets/${encodeURIComponent(ticketId)}/messages`);
}

export async function sendTicketMessage(ticketId: string, message: string): Promise<unknown> {
  return apiClient.post<unknown>(`/tickets/${encodeURIComponent(ticketId)}/messages`, { message });
}
