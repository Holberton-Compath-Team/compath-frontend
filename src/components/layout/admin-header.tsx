"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ADMIN_NAV_LINKS } from "@/constants/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { logout } from "@/services/auth";
import { cn } from "@/utils/cn";

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthUser();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="h-header bg-surface sticky top-0 z-40 shadow-xs">
      <Container className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-h4 text-ku-green focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            COMPATH
          </Link>

          <nav aria-label="Admin naviqasiyası">
            <ul className="flex items-center gap-2">
              {ADMIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "focus-visible:ring-ring rounded-lg px-4 py-2 text-small transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                        isActive
                          ? "bg-ku-green-soft text-ku-green-dark font-medium"
                          : "text-text-secondary hover:text-ku-green",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
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
