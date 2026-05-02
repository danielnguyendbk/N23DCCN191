"use server";

import { formSchema } from "@/lib/schema";

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function registerAction(
  formData: Record<string, string>
): Promise<ActionResult> {
  // --- LAYER 2: Double Validation tại Server bằng schema.safeParse() ---
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    // Gom lỗi Zod thành object { field: message }
    const errors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      errors[field] = err.message;
    });

    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
      errors,
    };
  }

  // --- Giả lập kiểm tra email đã tồn tại (business logic) ---
  const existingEmails = ["test@test.com", "admin@admin.com"];
  if (existingEmails.includes(result.data.email)) {
    return {
      success: false,
      message: "Email này đã được đăng ký.",
      errors: { email: "Email đã tồn tại trong hệ thống" },
    };
  }

  // --- Giả lập lưu DB (thực tế dùng Prisma / Drizzle) ---
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Đã lưu thành viên mới:", {
    name: result.data.name,
    email: result.data.email,
    // KHÔNG log password ra console thật
  });

  return {
    success: true,
    message: `Chào mừng ${result.data.name}! Đăng ký thành công.`,
  };
}
