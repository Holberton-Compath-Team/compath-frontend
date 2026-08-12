import { apiClient } from "@/lib/api-client";
import type { CreateTicketPayload, CreateTicketResponse, Ticket } from "@/types/ticket";

export async function getTickets(): Promise<Ticket[]> {
  return apiClient.get<Ticket[]>("/tickets");
}

export async function createTicket(
  payload: CreateTicketPayload,
): Promise<CreateTicketResponse> {
  return apiClient.post<CreateTicketResponse>("/tickets", payload);
}

export async function updateTicketStatus(id: number, status: string): Promise<unknown> {
  return apiClient.put<unknown>(`/tickets/${id}`, { status });
}

export async function deleteTicket(id: number): Promise<unknown> {
  return apiClient.delete<unknown>(`/tickets/${id}`);
}
