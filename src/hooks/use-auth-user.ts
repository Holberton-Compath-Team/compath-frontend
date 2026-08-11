"use client";

import { useSyncExternalStore } from "react";

import { getUser } from "@/services/auth/user";
import type { AuthUser } from "@/types/auth";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export function useAuthUser(): AuthUser | null {
  return useSyncExternalStore(subscribe, getUser, getServerSnapshot);
}
