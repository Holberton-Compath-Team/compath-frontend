import { apiClient } from "@/lib/api-client";
import { clearToken, setToken } from "@/services/auth/token";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  SignupResponse,
} from "@/types/auth";

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
): Promise<SignupResponse> {
  const payload: SignupPayload = { fullname, email, password };
  return apiClient.post<SignupResponse>("/signup", payload);
}

export function logout(): void {
  clearToken();
}
