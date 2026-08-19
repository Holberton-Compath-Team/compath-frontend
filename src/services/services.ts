import { apiClient } from "@/lib/api-client";
import type { Service } from "@/types/service";

export async function getServices(): Promise<Service[]> {
  return apiClient.get<Service[]>("/services");
}
