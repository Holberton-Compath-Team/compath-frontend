import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card>
      <CardTitle>{service.name}</CardTitle>
      <CardContent className="text-small text-text-secondary">
        {service.description}
      </CardContent>
    </Card>
  );
}
