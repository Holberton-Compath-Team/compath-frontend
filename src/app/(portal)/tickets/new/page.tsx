import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NewTicketPage() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-3 py-16 text-center">
        <h1 className="text-h1 text-text-primary">Yeni Müraciət</h1>
        <p className="text-body text-text-secondary max-w-lg">
          Yeni müraciət forması tezliklə bu səhifədə əlçatan olacaq.
        </p>
      </Container>
    </Section>
  );
}
