import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardTitle>Qeydiyyat</CardTitle>
          <CardDescription>
            Yeni hesab yaratmaq üçün məlumatlarınızı daxil edin.
          </CardDescription>
          <RegisterForm />
        </Card>
      </Container>
    </Section>
  );
}
