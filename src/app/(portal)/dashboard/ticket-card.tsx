"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import { inputVariants } from "@/components/ui/input";
import {
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUSES,
} from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { deleteTicket, updateTicketStatus } from "@/services/tickets";
import type { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format-date";

interface TicketCardProps {
  ticket: Ticket;
}

function resolveErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Əməliyyat uğursuz oldu. Yenidən cəhd edin.";
}

export function TicketCard({ ticket }: TicketCardProps) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (status: string) => updateTicketStatus(ticket.id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTicket(ticket.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

  const badgeVariant =
    TICKET_STATUS_BADGE_VARIANT[ticket.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT;

  function handleDelete() {
    if (window.confirm("Bu müraciəti silmək istədiyinizə əminsiniz?")) {
      deleteMutation.mutate();
    }
  }

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
      </CardContent>
      <CardActions>
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
      {statusMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(statusMutation.error)}
        </p>
      )}
      {deleteMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(deleteMutation.error)}
        </p>
      )}
    </Card>
  );
}
