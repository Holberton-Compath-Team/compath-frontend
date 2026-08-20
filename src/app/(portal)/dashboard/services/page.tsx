"use client";

import { useQuery } from "@tanstack/react-query";
import { Inbox, RefreshCw } from "lucide-react";

import { ServiceCard } from "@/app/(marketing)/services/service-card";
import { ServicesSkeleton } from "@/app/(marketing)/services/services-skeleton";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getServices } from "@/services/services";

export default function PortalServicesPage() {
  const {
    data: services,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-text-primary">Xidmətlər</h1>

        {isPending && <ServicesSkeleton />}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              Xidmətlər yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Yenidən cəhd et
            </Button>
          </div>
        )}

        {services && services.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <Inbox className="size-6 text-text-secondary" aria-hidden="true" />
            <p className="text-body text-text-secondary">
              Hələ heç bir xidmət əlavə olunmayıb.
            </p>
          </div>
        )}

        {services && services.length > 0 && (
          <div className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
