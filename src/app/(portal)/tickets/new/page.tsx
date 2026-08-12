import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { NewTicketForm } from "./new-ticket-form";

export default function NewTicketPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardTitle>Yeni Müraciət</CardTitle>
          <CardDescription>
            Probleminizi qısaca izah edin, uyğun şöbəyə yönləndirəcəyik.
          </CardDescription>
          <NewTicketForm />
        </Card>
      </Container>
    </Section>
  );
}
