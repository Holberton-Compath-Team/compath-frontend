"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart3, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllTickets } from "@/services/tickets";

import { AnalyticsSkeleton } from "./analytics-skeleton";
import { BarChartStatus } from "./bar-chart-status";
import { DonutChartDepartments } from "./donut-chart-departments";
import { LineChartActivity } from "./line-chart-activity";

export default function AdminAnalyticsPage() {
  const {
    data: tickets,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: getAllTickets,
  });

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1 className="text-h1 text-text-primary">Admin Panel — Analitika</h1>

        {isPending && <AnalyticsSkeleton />}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              Analitika yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Yenidən cəhd et
            </Button>
          </div>
        )}

        {tickets && tickets.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <BarChart3 className="size-6 text-text-secondary" aria-hidden="true" />
            <p className="text-body text-text-secondary">
              Hələ analitika üçün kifayət qədər müraciət yoxdur.
            </p>
          </div>
        )}

        {tickets && tickets.length > 0 && (
          <div className="flex flex-col gap-6">
            <LineChartActivity tickets={tickets} />
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
              <DonutChartDepartments tickets={tickets} />
              <BarChartStatus tickets={tickets} />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
