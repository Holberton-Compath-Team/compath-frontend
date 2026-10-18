"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageSquare, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { TicketMessageBubble } from "@/components/tickets/ticket-message-bubble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  DEFAULT_TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_BADGE_VARIANT,
  TICKET_STATUS_LABEL,
} from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { trackTicket } from "@/services/anonymous";
import { formatDate } from "@/utils/format-date";
import { getTicketPriorityBadgeVariant, getTicketPriorityLabel } from "@/utils/ticket";

export default function TrackResultPage() {
  const { code } = useParams<{ code: string }>();

  const {
    data: result,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["track", code],
    queryFn: () => trackTicket(code),
  });

  const isNotFound = error instanceof ApiError && error.status === 404;
  const isRateLimited = error instanceof ApiError && error.status === 429;

  return (
    <Section>
      <Container className="flex flex-col gap-6">
        <Link
          href="/track"
          className="inline-flex w-fit items-center gap-2 text-small text-text-secondary hover:text-ku-green"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Yeni axtarış
        </Link>

        {isPending ? (
          <div className="h-40 animate-pulse rounded-card bg-surface p-6 shadow-sm" aria-hidden="true" />
        ) : isError ? (
          <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-16 text-center shadow-sm">
            <p className="text-body text-text-secondary">
              {isNotFound
                ? "Müraciət tapılmadı. Kodu yoxlayın."
                : isRateLimited
                  ? "Çox sorğu göndərildi, bir az sonra yenidən cəhd edin."
                  : "Müraciət yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."}
            </p>
            {!isNotFound && !isRateLimited && (
              <Button onClick={() => refetch()}>
                <RefreshCw className="size-4" aria-hidden="true" />
                Yenidən cəhd et
              </Button>
            )}
          </div>
        ) : (
          <>
            <Card>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="min-w-0 break-words">{result.title}</CardTitle>
                <Badge
                  variant={TICKET_STATUS_BADGE_VARIANT[result.status] ?? DEFAULT_TICKET_STATUS_BADGE_VARIANT}
                  className="shrink-0"
                >
                  {TICKET_STATUS_LABEL[result.status] ?? result.status}
                </Badge>
              </div>
              <CardContent className="flex flex-col gap-2">
                <p>{result.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-small text-text-secondary">
                  <Badge variant={getTicketPriorityBadgeVariant(result.priority)}>
                    {getTicketPriorityLabel(result.priority)}
                  </Badge>
                  <span>{result.department ?? result.category}</span>
                  {result.createdAt && <span>{formatDate(result.createdAt)}</span>}
                </div>
                {result.attachedFiles && result.attachedFiles.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {result.attachedFiles.map((url, index) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-ku-green hover:text-ku-green-dark underline"
                      >
                        Əlavə sənəd {index + 1}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 rounded-card bg-surface p-6 shadow-sm">
              <h2 className="text-h3 text-text-primary">Mesajlar</h2>
              {result.messages.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-card bg-background p-8 text-center">
                  <MessageSquare className="size-6 text-text-secondary" aria-hidden="true" />
                  <p className="text-body text-text-secondary">Hələ mesaj yoxdur.</p>
                </div>
              ) : (
                <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
                  {result.messages.map((message) => (
                    <TicketMessageBubble
                      key={message.id}
                      message={{
                        id: message.id,
                        sender: message.sender,
                        sender_role: message.senderRole,
                        message: message.message,
                        created_at: message.createdAt,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
