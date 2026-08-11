"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useAuthUser } from "@/hooks/use-auth-user";
import { logout } from "@/services/auth";

interface PortalHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function PortalHeader({ isSidebarOpen, onToggleSidebar }: PortalHeaderProps) {
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
          <button
            type="button"
            aria-label={isSidebarOpen ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={isSidebarOpen}
            aria-controls="portal-sidebar-drawer"
            onClick={onToggleSidebar}
            className="text-text-primary focus-visible:ring-ring laptop:hidden flex size-12 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {isSidebarOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>

          <Link
            href="/dashboard"
            className="text-h4 text-ku-green focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            COMPATH
          </Link>
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
