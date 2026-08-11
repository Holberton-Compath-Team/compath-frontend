"use client";

import { useSyncExternalStore } from "react";

import { getToken } from "@/services/auth/token";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getServerSnapshot(): string | null {
  return null;
}

export function useAuthToken(): string | null {
  return useSyncExternalStore(subscribe, getToken, getServerSnapshot);
}
