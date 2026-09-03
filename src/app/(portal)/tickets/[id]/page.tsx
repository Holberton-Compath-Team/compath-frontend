"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { TicketMessageForm } from "@/components/tickets/ticket-message-form";
import { TicketMessageList } from "@/components/tickets/ticket-message-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
} from "@/constants/tickets";
import { getTickets } from "@/services/tickets";
import { formatDate } from "@/utils/format-date";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const ticketId = Number(id);

  const {
    data: tickets,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const ticket = tickets?.find((item) => item.id === ticketId);

  return (
    <Section>
      <Container className="flex flex-col gap-6">
        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center gap-2 text-small text-text-secondary hover:text-ku-green"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Müraciətlərə qayıt
        </Link>

        {isPending ? (
          <div className="h-40 animate-pulse rounded-card bg-surface p-6 shadow-sm" aria-hidden="true" />
        ) : isError ? (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              Müraciət yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
            </p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Yenidən cəhd et
            </Button>
          </div>
        ) : !ticket ? (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">Müraciət tapılmadı.</p>
          </div>
        ) : (
          <>
            <Card>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="min-w-0 break-words">{ticket.title}</CardTitle>
                <Badge
                  variant={TICKET_STATUS_BADGE_VARIANT[ticket.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT}
                  className="shrink-0"
                >
                  {ticket.status}
                </Badge>
              </div>
              <CardContent className="flex flex-col gap-2">
                <p>{ticket.description}</p>
                <div className="flex flex-wrap gap-4 text-small text-text-secondary">
                  <span>{ticket.department}</span>
                  <span>{formatDate(ticket.created_at)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-sm">
              <h2 className="text-h3 text-text-primary">Mesajlar</h2>
              <TicketMessageList ticketId={ticket.id} />
              <TicketMessageForm ticketId={ticket.id} />
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
