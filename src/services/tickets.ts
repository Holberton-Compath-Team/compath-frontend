import { apiClient } from "@/lib/api-client";
import type { Ticket } from "@/types/ticket";

export async function getTickets(): Promise<Ticket[]> {
  return apiClient.get<Ticket[]>("/tickets");
}
