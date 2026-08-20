"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input, inputVariants } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { createTicketSchema, type CreateTicketFormValues } from "@/schemas/ticket.schema";
import { getServices } from "@/services/services";
import { createTicket } from "@/services/tickets";
import { cn } from "@/utils/cn";

const REDIRECT_DELAY_MS = 1200;

export function NewTicketForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const departmentParam = searchParams.get("department");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
  });

  const {
    data: services,
    isPending: isServicesPending,
    isError: isServicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  useEffect(() => {
    if (departmentParam && services?.some((service) => service.name === departmentParam)) {
      setValue("department", departmentParam);
    }
  }, [departmentParam, services, setValue]);

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
  const isDepartmentDisabled = isDone || isServicesPending || isServicesError || services?.length === 0;

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
        <div className="relative">
          <select
            id="ticket-department"
            className={cn(
              inputVariants({ hasError: Boolean(errors.department) }),
              "appearance-none pr-8",
            )}
            aria-invalid={Boolean(errors.department)}
            aria-describedby={errors.department ? "ticket-department-error" : undefined}
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
