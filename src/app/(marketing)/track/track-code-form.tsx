"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackCodeSchema, type TrackCodeFormValues } from "@/schemas/anonymous.schema";

export function TrackCodeForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackCodeFormValues>({
    resolver: zodResolver(trackCodeSchema),
  });

  function onSubmit(values: TrackCodeFormValues) {
    router.push(`/track/${encodeURIComponent(values.code)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Input
        id="tracking-code"
        label="İzləmə kodu"
        type="text"
        placeholder="CP-8A4F9B"
        error={errors.code?.message}
        {...register("code")}
      />

      <Button type="submit" className="w-full">
        Müraciəti izlə
      </Button>
    </form>
  );
}
