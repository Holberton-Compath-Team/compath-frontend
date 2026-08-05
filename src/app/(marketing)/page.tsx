import { EmergencyBanner } from "@/components/sections/emergency-banner";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ServiceCategories } from "@/components/sections/service-categories";
import { TrustSecurity } from "@/components/sections/trust-security";
import { WhyCompath } from "@/components/sections/why-compath";

export default function Home() {
  return (
    <>
      <Hero />
      <EmergencyBanner />
      <ServiceCategories />
      <HowItWorks />
      <WhyCompath />
      <TrustSecurity />
      <FinalCta />
    </>
  );
}
