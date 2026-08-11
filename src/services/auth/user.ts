import type { AuthUser } from "@/types/auth";

const USER_STORAGE_KEY = "compath_user";

let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(USER_STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedUser;
  }

  cachedRaw = raw;

  try {
    cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    cachedUser = null;
  }

  return cachedUser;
}

export function setUser(user: AuthUser): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_STORAGE_KEY);
}
