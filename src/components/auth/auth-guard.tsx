"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthToken } from "@/hooks/use-auth-token";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const token = useAuthToken();

  useEffect(() => {
    if (token === null) {
      router.replace("/login");
    }
  }, [token, router]);

  if (token === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="shadow-sm h-32 w-full max-w-md animate-pulse rounded-card bg-surface" />
      </div>
    );
  }

  return <>{children}</>;
}
