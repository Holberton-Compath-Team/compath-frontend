import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function LoginPage() {
  return (
    <Section>
      <Container className="laptop:py-24 flex flex-col items-center gap-3 py-16 text-center">
        <h1 className="text-h1 text-text-primary">Daxil ol</h1>
        <p className="text-body text-text-secondary max-w-lg">
          Giriş forması tezliklə bu səhifədə əlçatan olacaq.
        </p>
      </Container>
    </Section>
  );
}
