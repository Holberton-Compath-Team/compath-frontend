import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HOW_IT_WORKS_STEPS } from "@/constants/landing";

function HowItWorks() {
  return (
    <Section className="bg-background">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-h2 text-text-primary">Necə işləyir</h2>
          <p className="text-body text-text-secondary mx-auto max-w-lg">
            Müraciətindən nəticəyə qədər beş sadə addım.
          </p>
        </div>

        <div className="laptop:grid-cols-5 tablet:grid-cols-2 grid grid-cols-1 gap-6">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="flex flex-col gap-2">
              <span className="text-h1 text-ku-green-soft font-bold">
                {step.step}
              </span>
              <h3 className="text-h4 text-text-primary">{step.title}</h3>
              <p className="text-small text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { HowItWorks };
