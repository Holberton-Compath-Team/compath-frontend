export interface Service {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface CreateServicePayload {
  name: string;
  description: string;
}

export interface CreateServiceResponse {
  message: string;
  status: string;
}
