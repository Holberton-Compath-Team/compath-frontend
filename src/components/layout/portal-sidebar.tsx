"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PORTAL_NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/utils/cn";

interface PortalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavListProps {
  pathname: string;
  onNavigate: () => void;
}

function NavList({ pathname, onNavigate }: NavListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {PORTAL_NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "focus-visible:ring-ring flex items-center gap-3 rounded-lg px-4 py-3 text-body transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "bg-ku-green-soft text-ku-green-dark font-medium"
                  : "text-text-secondary hover:bg-background hover:text-text-primary",
              )}
            >
              <Icon className="size-6" aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        aria-label="Portal naviqasiyası"
        className="w-sidebar bg-surface laptop:flex hidden shrink-0 flex-col p-4"
      >
        <NavList pathname={pathname} onNavigate={onClose} />
      </aside>

      {isOpen && (
        <button
          type="button"
          aria-label="Menyunu bağla"
          onClick={onClose}
          className="laptop:hidden fixed inset-0 z-30 bg-black/40"
        />
      )}

      <aside
        id="portal-sidebar-drawer"
        aria-label="Portal naviqasiyası"
        aria-hidden={!isOpen}
        className={cn(
          "w-sidebar top-header bottom-0 bg-surface shadow-md laptop:hidden fixed left-0 z-40 flex flex-col p-4 transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <NavList pathname={pathname} onNavigate={onClose} />
      </aside>
    </>
  );
}
