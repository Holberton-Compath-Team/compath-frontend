"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, inputVariants } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { createServiceSchema, type CreateServiceFormValues } from "@/schemas/service.schema";
import { createService } from "@/services/services";

export function NewServiceForm() {
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
  });

  async function onSubmit(values: CreateServiceFormValues) {
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      const response = await createService(values);
      setSubmitMessage(response.message);
      reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-services"] }),
        queryClient.invalidateQueries({ queryKey: ["services"] }),
      ]);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
      );
    }
  }

  return (
    <Card>
      <CardTitle>Yeni Xidmət Əlavə Et</CardTitle>

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
          id="service-name"
          label="Ad"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="service-description" className="text-small font-medium text-text-primary">
            Açıqlama
          </label>
          <textarea
            id="service-description"
            rows={3}
            className={inputVariants({ hasError: Boolean(errors.description) })}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? "service-description-error" : undefined}
            {...register("description")}
          />
          {errors.description && (
            <p id="service-description-error" role="alert" className="text-small text-danger">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="tablet:w-auto w-full">
          {isSubmitting ? "Əlavə edilir..." : "Xidmət Əlavə Et"}
        </Button>
      </form>
    </Card>
  );
}
