"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import { inputVariants } from "@/components/ui/input";
import {
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUSES,
} from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { updateTicketStatus } from "@/services/tickets";
import type { AdminTicket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format-date";

interface AdminTicketCardProps {
  ticket: AdminTicket;
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Əməliyyat uğursuz oldu. Yenidən cəhd edin.";
}

export function AdminTicketCard({ ticket }: AdminTicketCardProps) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (status: string) => updateTicketStatus(ticket.id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-tickets"] }),
  });

  const badgeVariant =
    TICKET_STATUS_BADGE_VARIANT[ticket.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <CardTitle className="min-w-0 break-words">{ticket.title}</CardTitle>
        <Badge variant={badgeVariant} className="shrink-0">
          {ticket.status}
        </Badge>
      </div>
      <CardContent className="flex flex-col gap-2">
        <p>{ticket.description}</p>
        <div className="flex flex-wrap gap-4 text-small text-text-secondary">
          <span>{ticket.department}</span>
          <span>{formatDate(ticket.created_at)}</span>
        </div>
        <div className="flex flex-wrap gap-4 text-small text-text-secondary">
          <span>{ticket.student?.fullname ?? "Naməlum tələbə"}</span>
          <span>{ticket.student?.email ?? "—"}</span>
        </div>
      </CardContent>
      <CardActions className="justify-between">
        <Link
          href={`/admin/tickets/${ticket.id}`}
          className="inline-flex items-center gap-1 text-small font-medium text-ku-green hover:text-ku-green-dark"
        >
          Detallara bax
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <div className="relative">
          <select
            aria-label="Status dəyiş"
            className={cn(inputVariants(), "w-auto appearance-none py-1 pr-8")}
            value={ticket.status}
            disabled={statusMutation.isPending}
            onChange={(event) => statusMutation.mutate(event.target.value)}
          >
            {TICKET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
      </CardActions>
      {statusMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(statusMutation.error)}
        </p>
      )}
    </Card>
  );
}
