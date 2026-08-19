"use client";

import { useQuery } from "@tanstack/react-query";
import { Inbox, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllTickets } from "@/services/tickets";

import { AdminTicketCard } from "./admin-ticket-card";
import { TicketListSkeleton } from "./ticket-list-skeleton";

export default function AdminTicketsPage() {
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
        <h1 className="text-h1 text-text-primary">Admin Panel — Bütün Müraciətlər</h1>

        {isPending && <TicketListSkeleton />}

        {isError && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              Müraciətlər yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Yenidən cəhd et
            </Button>
          </div>
        )}

        {tickets && tickets.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <Inbox className="size-6 text-text-secondary" aria-hidden="true" />
            <p className="text-body text-text-secondary">Hələ heç bir müraciət yoxdur.</p>
          </div>
        )}

        {tickets && tickets.length > 0 && (
          <div className="flex flex-col gap-4">
            {tickets.map((ticket) => (
              <AdminTicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
