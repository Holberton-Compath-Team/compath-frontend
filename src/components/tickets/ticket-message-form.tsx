"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { sendMessageSchema, type SendMessageFormValues } from "@/schemas/ticket.schema";
import { sendTicketMessage } from "@/services/tickets";

function resolveErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Mesaj göndərilə bilmədi. Yenidən cəhd edin.";
}

interface TicketMessageFormProps {
  ticketId: number;
}

export function TicketMessageForm({ ticketId }: TicketMessageFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
  });

  const sendMutation = useMutation({
    mutationFn: (values: SendMessageFormValues) => sendTicketMessage(ticketId, values.message),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticketId] });
    },
  });

  function onSubmit(values: SendMessageFormValues) {
    sendMutation.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" noValidate>
      <label htmlFor="ticket-message" className="text-small font-medium text-text-primary">
        Mesaj yaz
      </label>
      <textarea
        id="ticket-message"
        rows={3}
        className={inputVariants({ hasError: Boolean(errors.message) })}
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "ticket-message-error" : undefined}
        disabled={sendMutation.isPending}
        {...register("message")}
      />
      {errors.message && (
        <p id="ticket-message-error" role="alert" className="text-small text-danger">
          {errors.message.message}
        </p>
      )}
      {sendMutation.isError && (
        <p role="alert" className="text-small text-danger">
          {resolveErrorMessage(sendMutation.error)}
        </p>
      )}
      <Button type="submit" isLoading={sendMutation.isPending} className="self-end">
        {sendMutation.isPending ? "Göndərilir..." : "Göndər"}
      </Button>
    </form>
  );
}
