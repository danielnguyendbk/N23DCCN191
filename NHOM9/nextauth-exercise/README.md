# 🎓 NextAuth Token Refresh Exercise

Bài tập thực hành: Tự động refresh token và phân quyền truy cập với NextAuth.

## 📋 Yêu Cầu

- Node.js >= 16
- npm hoặc yarn

## 🚀 Hướng Dẫn Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

### 3. Truy cập ứng dụng
Mở trình duyệt và truy cập: **http://localhost:3000**

## 🔐 Thông tin Đăng Nhập Demo

| Username | Password | Role         |
|----------|----------|--------------|
| student  | 123456   | ROLE_STUDENT |
| advisor  | 123456   | ROLE_ADVISOR |

> ⚠️ **Lưu ý**: Chỉ **ROLE_ADVISOR** có thể truy cập dashboard

## 📝 Bài Tập Chi Tiết

### Bước 1: Đăng Nhập & Lưu Trữ Token
- Trang `/login.js` sử dụng **CredentialsProvider**
- Backend (giả lập) trả về `accessToken` (60 giây) và `refreshToken` (1 ngày)
- Callback `jwt()` lưu trữ: `accessToken`, `refreshToken`, `role`, `accessTokenExpires`

### Bước 2: Phân Quyền Truy Cập
- Trang chính (`pages/index.js`) kiểm tra `session.user.role`
- Nếu không phải `ROLE_ADVISOR` → Hiển thị lỗi "Bị Từ Chối Truy Cập"
- Nếu là `ROLE_ADVISOR` → Hiển thị dashboard

### Bước 3: Demo Token Refresh Tự Động

#### Cách Demo (20 phút):
1. **Đăng nhập** với tài khoản `advisor / 123456`
2. **Bấm "Lấy danh sách lớp"** → Thành công ✅
3. **Đợi 60+ giây** hoặc theo dõi "Access Token hết hạn sau: Xs"
4. **Bấm lại "Lấy danh sách lớp"** → NextAuth tự động:
   - Phát hiện `Date.now() > accessTokenExpires`
   - Gọi hàm `refreshAccessToken()` dùng `refreshToken`
   - Cập nhật session với token mới
   - Cho phép gọi API thành công 🔄
5. **Mở Developer Tools (F12)** → Console để xem log `🔄 Token hết hạn, đang refresh...`

## 📂 Cấu Trúc File

```
nextauth-exercise/
├── pages/
│   ├── _app.js                      # SessionProvider wrapper
│   ├── login.js                     # Trang đăng nhập
│   ├── index.js                     # Dashboard (yêu cầu ROLE_ADVISOR)
│   └── api/
│       └── auth/
│           └── [...nextauth].js     # NextAuth configuration
├── package.json
├── next.config.js
├── .gitignore
└── README.md
```

## 🔑 Các Khái Niệm Chính

### 1. **JWT Callback**
Kiểm tra token hết hạn và tự động refresh:
```javascript
async jwt({ token, user }) {
  if (Date.now() > token.accessTokenExpires) {
    return refreshedToken;
  }
  return token;
}
```

### 2. **Session Callback**
Đưa token vào session để component có thể sử dụng:
```javascript
async session({ session, token }) {
  session.accessToken = token.accessToken;
  return session;
}
```

### 3. **Refresh Token Logic**
Gọi API backend để lấy token mới:
```javascript
async function refreshAccessToken(refreshToken) {
  // Gọi API backend
  // Trả về token mới
}
```

## 💡 Điểm Chính Để Hiểu

✅ **Token tự động refresh** mà người dùng không cần làm gì
✅ **Phân quyền** dựa trên `role` trong session
✅ **Security**: AccessToken ngắn (60s), RefreshToken dài (1 ngày)
✅ **NextAuth** xử lý tất cả logic phía backend

## 🐛 Troubleshooting

### Token không refresh?
- Kiểm tra console xem có log `🔄 Token hết hạn, đang refresh...`
- Đảm bảo đã chờ 60+ giây

### Bị redirect về login?
- Kiểm tra `NEXTAUTH_SECRET` environment variable (nếu deploy)
- Localhost thì không cần

### Không thấy dashboard?
- Đảm bảo đăng nhập bằng `advisor` (ROLE_ADVISOR)
- `student` sẽ bị chặn

---

**Thời gian hoàn thành:** ~20 phút
**Độ khó:** ⭐⭐⭐ Trung bình
