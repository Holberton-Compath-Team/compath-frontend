import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { TrackCodeForm } from "./track-code-form";

export default function TrackPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardTitle>Müraciəti izlə</CardTitle>
          <CardDescription>
            Müraciət zamanı aldığınız izləmə kodunu daxil edin.
          </CardDescription>
          <TrackCodeForm />
        </Card>
      </Container>
    </Section>
  );
}
