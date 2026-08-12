import { z } from "zod";

import { TICKET_DEPARTMENTS } from "@/constants/tickets";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Başlıq tələb olunur"),
  description: z.string().min(1, "Açıqlama tələb olunur"),
  department: z.enum(TICKET_DEPARTMENTS, {
    errorMap: () => ({ message: "Şöbə seçilməlidir" }),
  }),
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;
