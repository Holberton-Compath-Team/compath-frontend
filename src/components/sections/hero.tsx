import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { HERO_CATEGORIES, HERO_HEADLINE, HERO_SUBTEXT } from "@/constants/landing";

function Hero() {
  return (
    <Section className="laptop:py-24 py-16">
      <Container className="laptop:grid-cols-2 grid grid-cols-1 items-center gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-h1 laptop:text-display text-text-primary">
            {HERO_HEADLINE}
          </h1>
          <p className="text-body text-text-secondary max-w-lg">{HERO_SUBTEXT}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className={buttonVariants({ variant: "primary" })}>
              Qeydiyyatdan keç
            </Link>
            <Link href="/how-it-works" className={buttonVariants({ variant: "secondary" })}>
              Necə işləyir
            </Link>
          </div>
        </div>

        <div className="bg-surface rounded-card border-border flex flex-col gap-4 border p-6 shadow-md">
          <p className="text-h4 text-text-primary">
            Sizə hansı mövzuda dəstək lazımdır?
          </p>
          <ul className="flex flex-col gap-3">
            {HERO_CATEGORIES.map((category) => (
              <li key={category.label}>
                <Link
                  href={category.href}
                  className="border-border hover:border-ku-green hover:bg-ku-green-soft/40 focus-visible:ring-ring flex items-center gap-3 rounded-lg border p-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <span className="bg-ku-green-soft text-ku-green-dark flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <category.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-body text-text-primary font-medium">
                    {category.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export { Hero };
