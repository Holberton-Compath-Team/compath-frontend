import { apiClient } from "@/lib/api-client";
import type { AnonymousTicketPayload, AnonymousTicketResponse, TrackingResult } from "@/types/ticket";

export async function createAnonymousTicket(
  payload: AnonymousTicketPayload,
): Promise<AnonymousTicketResponse> {
  return apiClient.post<AnonymousTicketResponse>("/tickets/anonymous", payload, { skipAuth: true });
}

export async function trackTicket(code: string): Promise<TrackingResult> {
  return apiClient.get<TrackingResult>(`/track/${encodeURIComponent(code)}`, { skipAuth: true });
}
