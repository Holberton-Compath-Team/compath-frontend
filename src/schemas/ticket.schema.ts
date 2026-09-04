import { z } from "zod";

import { ADMINISTRATIVE_FINANCE_SERVICE_NAME } from "@/constants/tickets";

const FIN_CODE_PATTERN = /^[A-Z0-9]{7}$/;

export const createTicketSchema = z
  .object({
    title: z.string().min(1, "Başlıq tələb olunur"),
    description: z.string().min(1, "Açıqlama tələb olunur"),
    department: z.string().min(1, "Şöbə seçilməlidir"),
    priority: z.string().optional(),
    documentType: z.string().optional(),
    educationForm: z.string().optional(),
    finCode: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.department !== ADMINISTRATIVE_FINANCE_SERVICE_NAME) {
      return;
    }

    if (!values.documentType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["documentType"],
        message: "Sənəd növü seçilməlidir",
      });
    }

    if (!values.educationForm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["educationForm"],
        message: "Təhsil alma forması seçilməlidir",
      });
    }

    if (!values.finCode || !FIN_CODE_PATTERN.test(values.finCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["finCode"],
        message: "FİN kodu düz 7 simvol (hərf/rəqəm) olmalıdır",
      });
    }
  });

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export const sendMessageSchema = z.object({
  message: z.string().min(1, "Mesaj tələb olunur"),
});

export type SendMessageFormValues = z.infer<typeof sendMessageSchema>;
