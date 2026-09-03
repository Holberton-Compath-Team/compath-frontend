"use client";

import { useQuery } from "@tanstack/react-query";
import { MessageSquare, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTicketMessages } from "@/services/tickets";

import { TicketMessageBubble } from "./ticket-message-bubble";

const SKELETON_ITEMS = [0, 1];

function TicketMessageListSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {SKELETON_ITEMS.map((item) => (
        <div key={item} className="flex animate-pulse flex-col gap-2 rounded-card bg-surface p-4 shadow-xs">
          <div className="h-4 w-1/4 rounded-lg bg-border" />
          <div className="h-4 w-3/4 rounded-lg bg-border" />
        </div>
      ))}
    </div>
  );
}

interface TicketMessageListProps {
  ticketId: number;
}

export function TicketMessageList({ ticketId }: TicketMessageListProps) {
  const {
    data: messages,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ticket-messages", ticketId],
    queryFn: () => getTicketMessages(ticketId),
  });

  if (isPending) {
    return <TicketMessageListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-8 text-center shadow-sm">
        <p className="text-body text-text-secondary">
          Mesajlar yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
        </p>
        <Button onClick={() => refetch()}>
          <RefreshCw className="size-4" aria-hidden="true" />
          Yenidən cəhd et
        </Button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card bg-surface p-8 text-center shadow-sm">
        <MessageSquare className="size-6 text-text-secondary" aria-hidden="true" />
        <p className="text-body text-text-secondary">Hələ mesaj yoxdur. İlk mesajı siz yazın.</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
      {messages.map((message) => (
        <TicketMessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
