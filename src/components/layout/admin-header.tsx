"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuthUser } from "@/hooks/use-auth-user";
import { logout } from "@/services/auth";

export function AdminHeader() {
  const router = useRouter();
  const user = useAuthUser();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="h-header bg-surface sticky top-0 z-40 shadow-xs">
      <Container className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/tickets"
            className="text-h4 text-ku-green focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            COMPATH
          </Link>
          <span className="text-small text-text-secondary">Admin Panel</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-small text-text-secondary tablet:block hidden">
              {user.fullname}
            </span>
          )}
          <Button type="button" variant="secondary" onClick={handleLogout}>
            <LogOut className="size-4" aria-hidden="true" />
            Çıxış
          </Button>
        </div>
      </Container>
    </header>
  );
}
