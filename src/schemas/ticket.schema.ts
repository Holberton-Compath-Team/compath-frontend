import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Başlıq tələb olunur"),
  description: z.string().min(1, "Açıqlama tələb olunur"),
  department: z.string().min(1, "Şöbə seçilməlidir"),
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export const sendMessageSchema = z.object({
  message: z.string().min(1, "Mesaj tələb olunur"),
});

export type SendMessageFormValues = z.infer<typeof sendMessageSchema>;
