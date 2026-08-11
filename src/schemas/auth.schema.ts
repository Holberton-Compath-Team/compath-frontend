import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email tələb olunur").email("Düzgün email formatı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullname: z.string().min(1, "Ad Soyad tələb olunur"),
  email: z.string().min(1, "Email tələb olunur").email("Düzgün email formatı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
