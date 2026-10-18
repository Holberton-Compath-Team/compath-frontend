import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { AnonymousTicketForm } from "./anonymous-ticket-form";

export default function AnonymousTicketPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardTitle>Anonim Müraciət</CardTitle>
          <CardDescription>
            Adınızı bildirmədən probleminizi izah edin, uyğun şöbəyə yönləndirəcəyik. Müraciətinizi
            yalnız sizə veriləcək izləmə kodu ilə izləyə biləcəksiniz.
          </CardDescription>
          <AnonymousTicketForm />
        </Card>
      </Container>
    </Section>
  );
}
