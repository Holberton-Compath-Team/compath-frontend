import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AdminTicketsPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-text-primary">Admin Panel — Bütün Müraciətlər</h1>
      </Container>
    </Section>
  );
}
