import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HOW_IT_WORKS_STEPS } from "@/constants/landing";

export default function HowItWorksPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-h1 text-text-primary">Necə işləyir</h1>
          <p className="text-body text-text-secondary max-w-lg">
            Müraciətindən nəticəyə qədər COMPATH-da keçdiyin beş addım.
          </p>
        </div>

        <ol className="flex flex-col gap-4">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <li
              key={step.step}
              className="tablet:flex-row flex flex-col gap-4 rounded-card bg-surface p-6 shadow-sm"
            >
              <span className="text-h1 text-ku-green-soft tablet:w-16 shrink-0 font-bold">
                {step.step}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-h3 text-text-primary">{step.title}</h2>
                <p className="text-body text-text-secondary">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
