"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import { useAuthToken } from "@/hooks/use-auth-token";
import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const token = useAuthToken();
  const applyHref = token
    ? `/tickets/new?department=${encodeURIComponent(service.name)}`
    : "/login";

  return (
    <Card>
      <CardTitle>{service.name}</CardTitle>
      <CardContent className="text-small text-text-secondary">
        {service.description}
      </CardContent>
      <CardActions>
        <Link href={applyHref} className={buttonVariants({ variant: "secondary" })}>
          Bu mövzuda müraciət et
        </Link>
      </CardActions>
    </Card>
  );
}
