import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FINAL_CTA } from "@/constants/landing";

function FinalCta() {
  return (
    <Section className="bg-ku-green">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-h2 text-white">{FINAL_CTA.title}</h2>
        <p className="text-body max-w-lg text-white/85">{FINAL_CTA.subtext}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={FINAL_CTA.primaryHref}
            className={buttonVariants({
              variant: "accent",
              className: "text-ku-green-dark",
            })}
          >
            {FINAL_CTA.primaryLabel}
          </Link>
          <Link
            href={FINAL_CTA.secondaryHref}
            className={buttonVariants({
              variant: "secondary",
              className: "border-white text-white hover:bg-white/10",
            })}
          >
            {FINAL_CTA.secondaryLabel}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export { FinalCta };
