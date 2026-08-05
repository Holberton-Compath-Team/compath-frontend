import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function HowItWorksPage() {
  return (
    <Section>
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-h1 text-text-primary">Necə işləyir</h1>
        <p className="text-body text-text-secondary max-w-lg">
          Prosesin ətraflı izahı tezliklə bu səhifədə əlçatan olacaq.
        </p>
      </Container>
    </Section>
  );
}
