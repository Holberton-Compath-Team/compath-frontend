"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input, inputVariants } from "@/components/ui/input";
import { TicketFileUpload, type TicketFileUploadState } from "@/components/tickets/ticket-file-upload";
import { DEFAULT_TICKET_PRIORITY, TICKET_PRIORITIES } from "@/constants/tickets";
import { ApiError } from "@/lib/api-client";
import { anonymousTicketSchema, type AnonymousTicketFormValues } from "@/schemas/anonymous.schema";
import { createAnonymousTicket } from "@/services/anonymous";
import { getServices } from "@/services/services";
import type { AnonymousTicketPayload } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { AnonymousTicketSuccess } from "./anonymous-ticket-success";

export function AnonymousTicketForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<TicketFileUploadState>({
    url: null,
    uploading: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnonymousTicketFormValues>({
    resolver: zodResolver(anonymousTicketSchema),
    defaultValues: { priority: DEFAULT_TICKET_PRIORITY },
  });

  const {
    data: services,
    isPending: isServicesPending,
    isError: isServicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  async function onSubmit(values: AnonymousTicketFormValues) {
    setSubmitError(null);

    const payload: AnonymousTicketPayload = {
      title: values.title,
      description: values.description,
      department: values.department,
      authorName: "Anonim",
      priority: values.priority,
      attachedFiles: attachment.url ? [attachment.url] : [],
    };

    try {
      const response = await createAnonymousTicket(payload);
      setTrackingCode(response.trackingCode);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
      );
    }
  }

  if (trackingCode) {
    return <AnonymousTicketSuccess trackingCode={trackingCode} />;
  }

  const isDepartmentDisabled = isServicesPending || isServicesError || services?.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      {submitError && (
        <p role="alert" className="rounded-lg border border-danger bg-danger/10 px-4 py-3 text-small text-danger">
          {submitError}
        </p>
      )}

      <Input
        id="anonymous-ticket-title"
        label="Başlıq"
        type="text"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="anonymous-ticket-department" className="text-small font-medium text-text-primary">
          Şöbə
        </label>
        <div className="relative">
          <select
            id="anonymous-ticket-department"
            className={cn(
              inputVariants({ hasError: Boolean(errors.department) }),
              "appearance-none pr-8",
            )}
            aria-invalid={Boolean(errors.department)}
            aria-describedby={errors.department ? "anonymous-ticket-department-error" : undefined}
            disabled={isDepartmentDisabled}
            defaultValue=""
            {...register("department")}
          >
            {isServicesPending && <option value="">Yüklənir...</option>}

            {!isServicesPending && !isServicesError && services?.length === 0 && (
              <option value="">Hazırda xidmət mövcud deyil</option>
            )}

            {!isServicesPending && !isServicesError && services && services.length > 0 && (
              <>
                <option value="" disabled>
                  Şöbə seçin
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </>
            )}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {isServicesError && (
          <p className="text-small text-danger">Xidmətlər yüklənə bilmədi.</p>
        )}
        {errors.department && (
          <p id="anonymous-ticket-department-error" role="alert" className="text-small text-danger">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="anonymous-ticket-priority" className="text-small font-medium text-text-primary">
          Prioritet
        </label>
        <div className="relative">
          <select
            id="anonymous-ticket-priority"
            className={cn(
              inputVariants({ hasError: Boolean(errors.priority) }),
              "appearance-none pr-8",
            )}
            aria-invalid={Boolean(errors.priority)}
            aria-describedby={errors.priority ? "anonymous-ticket-priority-error" : undefined}
            {...register("priority")}
          >
            {TICKET_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {errors.priority && (
          <p id="anonymous-ticket-priority-error" role="alert" className="text-small text-danger">
            {errors.priority.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="anonymous-ticket-description" className="text-small font-medium text-text-primary">
          Açıqlama
        </label>
        <textarea
          id="anonymous-ticket-description"
          rows={5}
          className={inputVariants({ hasError: Boolean(errors.description) })}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "anonymous-ticket-description-error" : undefined}
          {...register("description")}
        />
        {errors.description && (
          <p id="anonymous-ticket-description-error" role="alert" className="text-small text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <TicketFileUpload onChange={setAttachment} />

      <Button type="submit" isLoading={isSubmitting} disabled={attachment.uploading} className="w-full">
        {isSubmitting ? "Göndərilir..." : "Göndər"}
      </Button>
    </form>
  );
}
