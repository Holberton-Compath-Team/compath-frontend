"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { login } from "@/services/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmitError(null);

    try {
      const response = await login(values.email, values.password);
      router.push(response.user.role === "admin" ? "/admin/tickets" : "/dashboard");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Gözlənilməz xəta baş verdi. Yenidən cəhd edin.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      {justRegistered && (
        <p
          role="status"
          className="rounded-lg border border-success bg-ku-green-soft px-4 py-3 text-small text-ku-green-dark"
        >
          Qeydiyyat uğurludur, indi daxil olun.
        </p>
      )}

      {submitError && (
        <p role="alert" className="rounded-lg border border-danger bg-danger/10 px-4 py-3 text-small text-danger">
          {submitError}
        </p>
      )}

      <Input
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="login-password"
        label="Şifrə"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        {isSubmitting ? "Daxil olunur..." : "Daxil ol"}
      </Button>
    </form>
  );
}
