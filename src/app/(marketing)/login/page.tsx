import { Suspense } from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Section>
      <Container className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardTitle>Daxil ol</CardTitle>
          <CardDescription>
            Hesabınıza daxil olmaq üçün məlumatlarınızı daxil edin.
          </CardDescription>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </Card>
      </Container>
    </Section>
  );
}
