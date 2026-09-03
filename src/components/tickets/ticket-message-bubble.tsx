import { TICKET_MESSAGE_BUBBLE_CLASS } from "@/constants/tickets";
import type { TicketMessage } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { formatDateTime } from "@/utils/format-date";

interface TicketMessageBubbleProps {
  message: TicketMessage;
}

export function TicketMessageBubble({ message }: TicketMessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-card p-4",
        TICKET_MESSAGE_BUBBLE_CLASS[message.sender_role],
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-small font-medium text-text-primary">{message.sender}</span>
        <span className="text-caption text-text-secondary">{formatDateTime(message.created_at)}</span>
      </div>
      <p className="whitespace-pre-wrap break-words text-body text-text-primary">{message.message}</p>
    </div>
  );
}
