import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TRUST_POINTS } from "@/constants/landing";

function TrustSecurity() {
  return (
    <Section className="bg-ku-green-dark">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-h2 text-white">Təhlükəsizlik və anonimlik əsasdır</h2>
          <p className="text-body mx-auto max-w-lg text-white/70">
            Xüsusilə həssas və təcili hallarda məlumatların qorunması bizim üçün
            prioritetdir.
          </p>
        </div>

        <div className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="flex flex-col gap-3">
              <span className="bg-white/10 text-ku-cream flex size-12 items-center justify-center rounded-lg">
                <point.icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-h4 text-white">{point.title}</h3>
              <p className="text-small text-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { TrustSecurity };
