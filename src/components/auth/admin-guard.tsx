"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthToken } from "@/hooks/use-auth-token";
import { useAuthUser } from "@/hooks/use-auth-user";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const token = useAuthToken();
  const user = useAuthUser();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (token === null) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [token, isAdmin, router]);

  if (token === null || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="shadow-sm h-32 w-full max-w-md animate-pulse rounded-card bg-surface" />
      </div>
    );
  }

  return <>{children}</>;
}
