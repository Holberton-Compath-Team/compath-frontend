"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import {
  DEFAULT_TICKET_PRIORITY_BADGE_VARIANT,
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_PRIORITY_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
} from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { deleteTicket } from "@/services/tickets";
import type { Ticket } from "@/types/ticket";
import { formatDate } from "@/utils/format-date";

interface TicketCardProps {
  ticket: Ticket;
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Əməliyyat uğursuz oldu. Yenidən cəhd edin.";
}

export function TicketCard({ ticket }: TicketCardProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTicket(ticket.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

  const badgeVariant =
    TICKET_STATUS_BADGE_VARIANT[ticket.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT;
  const priorityBadgeVariant = ticket.priority
    ? (TICKET_PRIORITY_BADGE_VARIANT[ticket.priority] ?? DEFAULT_TICKET_PRIORITY_BADGE_VARIANT)
    : undefined;

  function handleDelete() {
    if (window.confirm("Bu müraciəti silmək istədiyinizə əminsiniz?")) {
      deleteMutation.mutate();
    }
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <CardTitle className="min-w-0 break-words">{ticket.title}</CardTitle>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <Badge variant={badgeVariant}>{ticket.status}</Badge>
          {ticket.priority && <Badge variant={priorityBadgeVariant}>{ticket.priority}</Badge>}
        </div>
      </div>
      <CardContent className="flex flex-col gap-2">
        <p>{ticket.description}</p>
        <div className="flex flex-wrap gap-4 text-small text-text-secondary">
          <span>{ticket.department}</span>
          <span>{formatDate(ticket.created_at)}</span>
        </div>
      </CardContent>
      <CardActions className="justify-between">
        <Link
          href={`/tickets/${ticket.id}`}
          className="inline-flex items-center gap-1 text-small font-medium text-ku-green hover:text-ku-green-dark"
        >
          Detallara bax
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <button
          type="button"
          aria-label="Müraciəti sil"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="text-text-secondary hover:text-danger focus-visible:ring-ring flex size-9 items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </CardActions>
      {deleteMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(deleteMutation.error)}
        </p>
      )}
    </Card>
  );
}

