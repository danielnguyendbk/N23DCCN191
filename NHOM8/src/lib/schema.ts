import { z } from "zod";

// Schema dùng chung cho cả Client (validate real-time) và Server (double validation)
export const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự"),

    email: z.string().email("Email không hợp lệ"),

    password: z
      .string()
      .min(8, "Tối thiểu 8 ký tự")
      .regex(/[A-Z]/, "Cần 1 chữ hoa")
      .regex(/[0-9]/, "Cần ít nhất 1 chữ số"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type FormSchema = z.infer<typeof formSchema>;
