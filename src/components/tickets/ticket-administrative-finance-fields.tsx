"use client";

import { ChevronDown } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input, inputVariants } from "@/components/ui/input";
import { DOCUMENT_TYPES, EDUCATION_FORMS } from "@/constants/tickets";
import type { CreateTicketFormValues } from "@/schemas/ticket.schema";
import { cn } from "@/utils/cn";

interface TicketAdministrativeFinanceFieldsProps {
  register: UseFormRegister<CreateTicketFormValues>;
  errors: FieldErrors<CreateTicketFormValues>;
  disabled?: boolean;
}

export function TicketAdministrativeFinanceFields({
  register,
  errors,
  disabled = false,
}: TicketAdministrativeFinanceFieldsProps) {
  const finCodeRegister = register("finCode");

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="ticket-document-type" className="text-small font-medium text-text-primary">
          Sənəd Növü
        </label>
        <div className="relative">
          <select
            id="ticket-document-type"
            className={cn(
              inputVariants({ hasError: Boolean(errors.documentType) }),
              "appearance-none pr-8",
            )}
            aria-invalid={Boolean(errors.documentType)}
            aria-describedby={errors.documentType ? "ticket-document-type-error" : undefined}
            disabled={disabled}
            defaultValue=""
            {...register("documentType")}
          >
            <option value="" disabled>
              Sənəd növünü seçin
            </option>
            {DOCUMENT_TYPES.map((documentType) => (
              <option key={documentType} value={documentType}>
                {documentType}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
        {errors.documentType && (
          <p id="ticket-document-type-error" role="alert" className="text-small text-danger">
            {errors.documentType.message}
          </p>
        )}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-small font-medium text-text-primary">Təhsil Alma Forması</legend>
        <div className="flex flex-wrap gap-4">
          {EDUCATION_FORMS.map((educationForm) => (
            <label
              key={educationForm}
              className="flex items-center gap-2 text-body text-text-primary"
            >
              <input
                type="radio"
                value={educationForm}
                disabled={disabled}
                className="size-4 accent-ku-green"
                {...register("educationForm")}
              />
              {educationForm}
            </label>
          ))}
        </div>
        {errors.educationForm && (
          <p role="alert" className="text-small text-danger">
            {errors.educationForm.message}
          </p>
        )}
      </fieldset>

      <Input
        id="ticket-fin-code"
        label="Şəxsiyyət Vəsiqəsinin FİN Kodu"
        type="text"
        maxLength={7}
        error={errors.finCode?.message}
        disabled={disabled}
        {...finCodeRegister}
        onChange={(event) => {
          event.target.value = event.target.value.toUpperCase();
          void finCodeRegister.onChange(event);
        }}
      />
    </>
  );
}
