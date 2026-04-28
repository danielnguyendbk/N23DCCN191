# Student API

REST API quản lý sinh viên xây dựng với Node.js, Express.js và MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Config**: dotenv

---

## Cài đặt & Chạy

### 1. Clone và cài dependencies

```bash
git clone <repo-url>
cd student-api
npm install
```

### 2. Cấu hình môi trường


```env
PORT=
MONGODB_URI=
```

### 3. Chạy project

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

### 4. Seed dữ liệu mẫu (tuỳ chọn)

```bash
npm run seed
```

---

## Cấu trúc thư mục

```
student-api/
├── scripts/
│   └── seed.js               # Seed dữ liệu mẫu
├── src/
│   ├── config/
│   │   └── db.js             # Kết nối MongoDB
│   ├── models/
│   │   └── student.model.js  # Mongoose schema
│   ├── services/
│   │   └── student.service.js # Business logic, truy vấn DB
│   ├── controllers/
│   │   └── student.controller.js # Xử lý request/response
│   ├── routes/
│   │   └── student.routes.js # Định nghĩa routes
│   ├── middlewares/
│   │   ├── validateObjectId.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   └── logger.middleware.js
│   ├── app.js                # Khởi tạo Express app
│   └── server.js             # Entry point
├── .env
├── .env.example
└── package.json
```

---

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/` | Tạo sinh viên mới |
| GET | `/` | Lấy danh sách sinh viên (có phân trang) |
| GET | `/top` | Lấy top sinh viên theo điểm |
| GET | `/stats/avg` | Tính điểm trung bình |
| GET | `/search?q=keyword` | Tìm kiếm sinh viên theo tên |
| GET | `/:id` | Lấy chi tiết sinh viên |
| PUT | `/:id` | Cập nhật thông tin sinh viên |
| PATCH | `/:id/score` | Cập nhật điểm sinh viên |
| DELETE | `/:id` | Xóa mềm sinh viên |

---

## Chi tiết API

### 1. Tạo sinh viên
**POST** `/api/students`

```json
{
  "studentId": "SV001",
  "name": "Nguyen Van A",
  "email": "a@student.com",
  "score": 85,
  "major": "IT"
}
```

Response `201`:
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 2. Lấy danh sách sinh viên
**GET** `/api/students?page=1&limit=10&major=IT`

Response `200`:
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### 3. Lấy chi tiết sinh viên
**GET** `/api/students/:id`

Response `200`:
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 4. Cập nhật sinh viên
**PUT** `/api/students/:id`

```json
{
  "name": "Nguyen Van B",
  "score": 90,
  "major": "Business"
}
```

---

### 5. Xóa sinh viên (soft delete)
**DELETE** `/api/students/:id`

Response `200`:
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

### 6. Cập nhật điểm
**PATCH** `/api/students/:id/score`

```json
{
  "score": 95
}
```

---

### 7. Top sinh viên
**GET** `/api/students/top?limit=5`

---

### 8. Điểm trung bình
**GET** `/api/students/stats/avg`

Response `200`:
```json
{
  "success": true,
  "averageScore": 78.5,
  "totalStudents": 20
}
```

---

### 9. Tìm kiếm theo tên
**GET** `/api/students/search?q=nguyen`

---

## Giá trị hợp lệ

| Field | Validation |
|-------|-----------|
| `studentId` | String, bắt buộc, không trùng |
| `name` | String, bắt buộc |
| `email` | String, bắt buộc, không trùng |
| `score` | Number, 0–100 |
| `major` | `IT` \| `Business` \| `Design` \| `Marketing` |

---

## Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|-----|-------------|-----------|
| `400 Invalid student id` | ObjectId không hợp lệ | Kiểm tra lại ID trong URL |
| `400 studentId already exists` | studentId trùng | Dùng studentId khác |
| `400 email already exists` | Email trùng | Dùng email khác |
| `404 Student not found` | ID không tồn tại hoặc đã xóa | Kiểm tra lại ID |
| `400 score must be 0-100` | Score ngoài phạm vi | Nhập score từ 0 đến 100 |
| `500 Internal server error` | Lỗi server | Kiểm tra log server |
