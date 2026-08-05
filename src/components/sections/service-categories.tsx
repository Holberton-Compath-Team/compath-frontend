import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardActions,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/constants/landing";

function ServiceCategories() {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-h2 text-text-primary">Uyğun xidməti tapın</h2>
          <p className="text-body text-text-secondary mx-auto max-w-lg">
            Problemin hansı kateqoriyaya aid olduğunu seç, COMPATH səni doğru
            xidmətə yönləndirsin.
          </p>
        </div>

        <div className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
          {SERVICE_CATEGORIES.map((category) => (
            <Card key={category.title}>
              <span className="bg-ku-green-soft text-ku-green-dark flex size-12 items-center justify-center rounded-lg">
                <category.icon className="size-6" aria-hidden="true" />
              </span>

              <div className="flex items-center gap-2">
                <CardTitle>{category.title}</CardTitle>
                {category.urgent && <Badge variant="danger">Həssas</Badge>}
              </div>

              <CardContent className="text-text-secondary text-small">
                {category.description}
              </CardContent>

              <CardActions>
                <Link
                  href={category.href}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Ətraflı bax
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { ServiceCategories };
