import { apiClient } from "@/lib/api-client";
import { clearToken, setToken } from "@/services/auth/token";
import type { AuthResponse, LoginPayload, SignupPayload } from "@/types/auth";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const payload: LoginPayload = { email, password };
  const response = await apiClient.post<AuthResponse>("/login", payload);
  setToken(response.token);
  return response;
}

export async function signup(
  fullname: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const payload: SignupPayload = { fullname, email, password };
  const response = await apiClient.post<AuthResponse>("/signup", payload);
  setToken(response.token);
  return response;
}

export function logout(): void {
  clearToken();
}
