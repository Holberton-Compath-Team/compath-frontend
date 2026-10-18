import { z } from "zod";

export const anonymousTicketSchema = z.object({
  title: z.string().min(1, "Başlıq tələb olunur"),
  description: z.string().min(1, "Açıqlama tələb olunur"),
  department: z.string().min(1, "Şöbə seçilməlidir"),
  priority: z.string().optional(),
});

export type AnonymousTicketFormValues = z.infer<typeof anonymousTicketSchema>;

const TRACKING_CODE_PATTERN = /^CP-[A-Z0-9]{6}$/;

export const trackCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "İzləmə kodu tələb olunur")
    .transform((value) => value.toUpperCase())
    .refine((value) => TRACKING_CODE_PATTERN.test(value), {
      message: "Kod formatı düzgün deyil. Nümunə: CP-8A4F9B",
    }),
});

export type TrackCodeFormValues = z.infer<typeof trackCodeSchema>;
