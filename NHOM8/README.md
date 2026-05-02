# Lab Nhóm 7 — Form Đăng Ký Thành Viên

> React Hook Form · Zod · Next.js Server Actions

## Yêu cầu bài thực hành

| Yêu cầu | Giải pháp |
|---|---|
| Tránh lạm dụng `useState` (10 input = 10 state) | Dùng `register()` của `react-hook-form` → Uncontrolled Components |
| Real-time validation khi blur | `mode: "onBlur"` + Zod resolver |
| Validate 2 lớp (Client & Server) | Layer 1: `zodResolver` · Layer 2: `schema.safeParse()` trong Server Action |
| Luồng dữ liệu "sạch" | `formSchema.safeParse()` bắt dữ liệu rác trước khi xử lý |

## Cấu trúc project

```
src/
├── lib/
│   └── schema.ts          # Zod schema dùng chung Client + Server
├── actions/
│   └── register.ts        # Next.js Server Action ("use server")
├── components/
│   ├── RegisterForm.tsx   # UI: react-hook-form + Uncontrolled Components
│   └── RegisterForm.module.css
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
```

## Luồng hoạt động

```
User nhập → blur → zodResolver validate (Layer 1, Client)
         → submit → handleSubmit() → registerAction() (Server Action)
                                   → schema.safeParse() (Layer 2, Server)
                                   → { success, message, errors }
```

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Các điểm kỹ thuật

### Uncontrolled Components
```tsx
// ✅ Đúng: register() giữ ref nội bộ, không re-render
<input {...register("email")} />

// ❌ Sai: useState gây re-render toàn bộ mỗi lần gõ
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

### Zod Schema (dùng chung 2 lớp)
```ts
export const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string()
    .min(8, "Tối thiểu 8 ký tự")
    .regex(/[A-Z]/, "Cần 1 chữ hoa")
    .regex(/[0-9]/, "Cần ít nhất 1 chữ số"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});
```

### Server Action (Double Validation)
```ts
"use server";
export async function registerAction(data) {
  const result = formSchema.safeParse(data); // Layer 2
  if (!result.success) return { success: false, errors: ... };
  // lưu DB...
  return { success: true, message: "Đăng ký thành công!" };
}
```
