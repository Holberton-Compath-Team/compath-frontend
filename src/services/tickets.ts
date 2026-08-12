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
