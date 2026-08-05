"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/constants/navigation";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="h-header bg-surface sticky top-0 z-40 shadow-xs">
      <Container className="flex h-full items-center justify-between">
        <Link
          href="/"
          className="text-h4 text-ku-green focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          COMPATH
        </Link>

        <div className="flex items-center gap-8">
          <nav aria-label="Əsas naviqasiya" className="tablet:block hidden">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-text-secondary hover:text-ku-green focus-visible:ring-ring rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="tablet:flex hidden items-center gap-3">
            <Link
              href="/login"
              className={buttonVariants({ variant: "secondary" })}
            >
              Daxil ol
            </Link>
            <Link
              href="/register"
              className={buttonVariants({ variant: "primary" })}
            >
              Qeydiyyat
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-text-primary focus-visible:ring-ring tablet:hidden flex size-10 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {isMenuOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobil naviqasiya"
          className="top-header bg-surface animate-in fade-in slide-in-from-top-2 tablet:hidden fixed inset-x-0 bottom-0 z-30 flex flex-col gap-6 overflow-y-auto p-6 duration-200"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-h4 text-text-primary focus-visible:ring-ring block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className={buttonVariants({
                variant: "secondary",
                className: "w-full",
              })}
            >
              Daxil ol
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className={buttonVariants({
                variant: "primary",
                className: "w-full",
              })}
            >
              Qeydiyyat
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export { Header };
