import { clearToken, getToken } from "@/services/auth/token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

interface ApiErrorBody {
  error?: string;
}

async function resolveErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.clone().json()) as ApiErrorBody;
    if (body.error) {
      return body.error;
    }
  } catch {
    // Body boş və ya JSON deyil — statusText-ə keçilir.
  }

  return response.statusText || "Sorğu uğursuz oldu";
}

function redirectToLogin(): void {
  if (typeof window === "undefined") {
    return;
  }

  clearToken();
  // Full reload (not router.push) is deliberate: api-client is a plain module
  // outside React, and a 401 must hard-reset all in-memory client state.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = "/login";
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await resolveErrorMessage(response);

    if (response.status === 401) {
      redirectToLogin();
    }

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
