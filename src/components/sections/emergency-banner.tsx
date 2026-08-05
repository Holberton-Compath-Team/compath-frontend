import Link from "next/link";

import { Container } from "@/components/ui/container";
import { EMERGENCY_BANNER } from "@/constants/landing";

function EmergencyBanner() {
  const Icon = EMERGENCY_BANNER.icon;

  return (
    <div className="bg-danger/10 border-danger/20 border-y">
      <Container className="flex flex-wrap items-center justify-center gap-3 py-3 text-center">
        <Icon className="text-danger size-4 shrink-0" aria-hidden="true" />
        <p className="text-small text-danger">{EMERGENCY_BANNER.text}</p>
        <Link
          href={EMERGENCY_BANNER.href}
          className="text-small text-danger focus-visible:ring-ring rounded-lg font-semibold underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {EMERGENCY_BANNER.linkLabel}
        </Link>
      </Container>
    </div>
  );
}

export { EmergencyBanner };
