import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Ad tələb olunur"),
  description: z.string().min(1, "Açıqlama tələb olunur"),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;
