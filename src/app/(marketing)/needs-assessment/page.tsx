import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeedsAssessmentFlow } from "@/components/needs-assessment/needs-assessment-flow";

export default function NeedsAssessmentPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <div className="flex w-full max-w-2xl flex-col gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-h1 text-text-primary">Xidmət tap</h1>
            <p className="text-body text-text-secondary max-w-lg">
              Bir neçə sualla probleminizi doğru universitet xidmətinə yönləndirək.
            </p>
          </div>

          <Suspense fallback={null}>
            <NeedsAssessmentFlow />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
