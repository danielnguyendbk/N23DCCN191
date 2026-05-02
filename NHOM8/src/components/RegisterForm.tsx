"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormSchema } from "@/lib/schema";
import { registerAction, type ActionResult } from "@/actions/register";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [serverResult, setServerResult] = useState<ActionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Uncontrolled Components: react-hook-form dùng register() + ref nội bộ
  // KHÔNG dùng useState cho từng field → tránh re-render toàn bộ component
  const {
    register,          // đăng ký input với useForm, KHÔNG dùng onChange thủ công
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // LAYER 1: Client-side validation qua Zod
    mode: "onBlur",                    // Hiển thị lỗi ngay khi blur khỏi input
  });

  // watch password để tính strength bar (read-only, không setState)
  const passwordValue = watch("password", "");

  // --- Password strength logic ---
  const hasLen = passwordValue.length >= 8;
  const hasUpper = /[A-Z]/.test(passwordValue);
  const hasNum = /[0-9]/.test(passwordValue);
  const strengthScore = [hasLen, hasUpper, hasNum].filter(Boolean).length;
  const strengthLabel = ["Yếu", "Trung bình", "Mạnh"][strengthScore - 1] ?? "";
  const strengthColor = ["#ef4444", "#f97316", "#22c55e"][strengthScore - 1] ?? "#1e2540";

  // --- Submit handler ---
  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setServerResult(null);

    // Gọi Server Action (Next.js tự xử lý RPC, không cần fetch API route)
    const result = await registerAction({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    setIsLoading(false);
    setServerResult(result);

    if (result.success) {
      reset(); // reset form về trạng thái ban đầu
    } else if (result.errors) {
      // Đưa lỗi server trả về vào từng field
      Object.entries(result.errors).forEach(([field, message]) => {
        setError(field as keyof FormSchema, { message });
      });
    }
  };

  return (
    <div className={styles.card}>
      <span className={styles.badge}>Nhóm 7 · Lab React Hook Form</span>
      <h1 className={styles.title}>Đăng ký thành viên</h1>
      <p className={styles.subtitle}>
        Uncontrolled Components · Zod Validation · Next.js Server Actions
      </p>

      {/* handleSubmit của react-hook-form chặn submit nếu client validation fail */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* --- Họ và tên --- */}
        <div className={styles.field}>
          <label htmlFor="name">Họ và tên</label>
          {/* register() = đăng ký uncontrolled input, KHÔNG cần onChange thủ công */}
          <input
            id="name"
            type="text"
            placeholder="Nguyễn Văn A"
            className={errors.name ? styles.inputError : ""}
            {...register("name")}
          />
          {errors.name && (
            <span className={styles.errMsg}>{errors.name.message}</span>
          )}
        </div>

        {/* --- Email --- */}
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className={errors.email ? styles.inputError : ""}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.errMsg}>{errors.email.message}</span>
          )}
        </div>

        {/* --- Mật khẩu + Strength bar --- */}
        <div className={styles.field}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            placeholder="Tối thiểu 8 ký tự..."
            className={errors.password ? styles.inputError : ""}
            {...register("password")}
          />

          {/* Strength bar */}
          {passwordValue && (
            <div className={styles.strengthWrap}>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthFill}
                  style={{
                    width: `${(strengthScore / 3) * 100}%`,
                    background: strengthColor,
                  }}
                />
              </div>
              <span className={styles.strengthLabel} style={{ color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}

          {/* Requirements badges */}
          <div className={styles.pwReqs}>
            <span className={`${styles.req} ${hasLen ? styles.reqMet : ""}`}>8+ ký tự</span>
            <span className={`${styles.req} ${hasUpper ? styles.reqMet : ""}`}>1 chữ HOA</span>
            <span className={`${styles.req} ${hasNum ? styles.reqMet : ""}`}>1 chữ số</span>
          </div>

          {errors.password && (
            <span className={styles.errMsg}>{errors.password.message}</span>
          )}
        </div>

        {/* --- Xác nhận mật khẩu --- */}
        <div className={styles.field}>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu..."
            className={errors.confirmPassword ? styles.inputError : ""}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className={styles.errMsg}>{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* --- Submit --- */}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
        </button>

        {/* --- Server response message --- */}
        {serverResult && (
          <div
            className={`${styles.serverMsg} ${
              serverResult.success ? styles.success : styles.fail
            }`}
          >
            {serverResult.message}
          </div>
        )}
      </form>
    </div>
  );
}
