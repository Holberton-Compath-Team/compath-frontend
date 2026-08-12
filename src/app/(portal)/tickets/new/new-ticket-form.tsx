"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input, inputVariants } from "@/components/ui/input";
import { TICKET_DEPARTMENTS } from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { createTicketSchema, type CreateTicketFormValues } from "@/schemas/ticket.schema";
import { createTicket } from "@/services/tickets";

const REDIRECT_DELAY_MS = 1200;

export function NewTicketForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
  });

  async function onSubmit(values: CreateTicketFormValues) {
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      const response = await createTicket(values);
      setSubmitMessage(response.message);
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      setTimeout(() => router.push("/dashboard"), REDIRECT_DELAY_MS);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
      );
    }
  }

  const isDone = submitMessage !== null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      {submitMessage && (
        <p
          role="status"
          className="rounded-lg border border-success bg-ku-green-soft px-4 py-3 text-small text-ku-green-dark"
        >
          {submitMessage}
        </p>
      )}

      {submitError && (
        <p role="alert" className="rounded-lg border border-danger bg-danger/10 px-4 py-3 text-small text-danger">
          {submitError}
        </p>
      )}

      <Input
        id="ticket-title"
        label="Başlıq"
        type="text"
        error={errors.title?.message}
        disabled={isDone}
        {...register("title")}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="ticket-department" className="text-small font-medium text-text-primary">
          Şöbə
        </label>
        <select
          id="ticket-department"
          className={inputVariants({ hasError: Boolean(errors.department) })}
          aria-invalid={Boolean(errors.department)}
          aria-describedby={errors.department ? "ticket-department-error" : undefined}
          disabled={isDone}
          defaultValue=""
          {...register("department")}
        >
          <option value="" disabled>
            Şöbə seçin
          </option>
          {TICKET_DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && (
          <p id="ticket-department-error" role="alert" className="text-small text-danger">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ticket-description" className="text-small font-medium text-text-primary">
          Açıqlama
        </label>
        <textarea
          id="ticket-description"
          rows={5}
          className={inputVariants({ hasError: Boolean(errors.description) })}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "ticket-description-error" : undefined}
          disabled={isDone}
          {...register("description")}
        />
        {errors.description && (
          <p id="ticket-description-error" role="alert" className="text-small text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting} disabled={isDone} className="w-full">
        {isSubmitting ? "Göndərilir..." : "Göndər"}
      </Button>
    </form>
  );
}
