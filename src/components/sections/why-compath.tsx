import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WHY_COMPATH_ITEMS } from "@/constants/landing";

function WhyCompath() {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-h2 text-text-primary">Niyə COMPATH</h2>
          <p className="text-body text-text-secondary mx-auto max-w-lg">
            Tələbələrin qarşılaşdığı əsas maneələri necə aradan qaldırırıq.
          </p>
        </div>

        <div className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
          {WHY_COMPATH_ITEMS.map((item) => (
            <Card key={item.problemTitle}>
              <span className="bg-ku-blue-light text-ku-green-dark flex size-12 items-center justify-center rounded-lg">
                <item.icon className="size-6" aria-hidden="true" />
              </span>

              <div className="flex flex-col gap-1">
                <CardTitle className="text-h4">{item.problemTitle}</CardTitle>
                <CardContent className="text-text-secondary text-small">
                  {item.problemDescription}
                </CardContent>
              </div>

              <ArrowRight
                className="text-ku-green size-4 rotate-90"
                aria-hidden="true"
              />

              <div className="bg-ku-green-soft flex flex-col gap-1 rounded-lg p-4">
                <p className="text-h4 text-ku-green-dark">{item.solutionTitle}</p>
                <p className="text-small text-ku-green-dark">
                  {item.solutionDescription}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { WhyCompath };
