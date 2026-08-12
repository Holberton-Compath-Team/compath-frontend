import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
} from "@/constants/tickets";
import type { Ticket } from "@/types/ticket";
import { formatDate } from "@/utils/format-date";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const badgeVariant =
    TICKET_STATUS_BADGE_VARIANT[ticket.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <CardTitle>{ticket.title}</CardTitle>
        <Badge variant={badgeVariant}>{ticket.status}</Badge>
      </div>
      <CardContent className="flex flex-col gap-2">
        <p>{ticket.description}</p>
        <div className="flex flex-wrap gap-4 text-small text-text-secondary">
          <span>{ticket.department}</span>
          <span>{formatDate(ticket.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
