import { apiClient } from "@/lib/api-client";
import type { CreateServicePayload, CreateServiceResponse, Service } from "@/types/service";

export async function getServices(): Promise<Service[]> {
  return apiClient.get<Service[]>("/services");
}

export async function createService(payload: CreateServicePayload): Promise<CreateServiceResponse> {
  return apiClient.post<CreateServiceResponse>("/services", payload);
}

export async function deleteService(id: number): Promise<unknown> {
  return apiClient.delete<unknown>(`/services/${id}`);
}
