# Backend - OptiMine

Express.js backend API dengan PostgreSQL (Supabase).

## 📋 Prerequisites

- Node.js (v18 atau lebih tinggi)
- PostgreSQL (menggunakan Supabase)
- SMTP Email Account (Gmail recommended)
- npm atau yarn

## 🚀 Setup

### 1. Install dependencies:

```bash
npm install
```

### 2. Setup environment variables (`.env`):

```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=your_expired_jwt

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:5173
VERIFICATION_CODE_EXPIRES_IN=10 (Ubah sesuai dengan keinginan)
PASSWORD_RESET_TOKEN_EXPIRES_IN=15 (Ubah sesuai dengan keinginan)
```

**Catatan Penting:**

- `DATABASE_URL`: Ganti `[YOUR_PASSWORD]` dan `[PROJECT_REF]` dengan kredensial Supabase Anda
- `JWT_SECRET`: Gunakan string acak yang kuat (minimal 32 karakter)
- `SMTP_PASS`: Gunakan Gmail App Password, bukan password biasa
- `VERIFICATION_CODE_EXPIRES_IN`: Waktu kedaluwarsa kode verifikasi dalam menit
- `PASSWORD_RESET_TOKEN_EXPIRES_IN`: Waktu kedaluwarsa token reset password dalam menit

### 3. Run database migrations:

- Login ke Supabase Dashboard
- Execute SQL dari `src/database/schema.sql`

### 4. Setup Gmail App Password

1. Login ke Google Account
2. Buka [App Passwords](https://myaccount.google.com/apppasswords)
3. Pilih "Mail" dan "Other (Custom name)"
4. Masukkan nama aplikasi (contoh: "OptiMine Backend")
5. Generate password
6. Copy password tersebut ke `SMTP_PASS` di `.env`

### 5. Start development server:

```bash
npm run dev
```

### 6. Start Production Build

```bash
npm start
```

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - Login dan kirim kode verifikasi
- `POST /api/auth/verify` - Verifikasi kode dan complete login
- `POST /api/auth/register` - Register user baru (tidak ada halaman register)
- `POST /api/auth/resend-code` - Kirim ulang kode verifikasi
- `POST /api/auth/forgot-password` - Lupa password
- `POST /api/auth/reset-password` - Untuk reset password
- `GET /api/auth/me` - Get current user (protected)

## Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── constants/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── database/       # Database schema
│   └── server.js       # Entry point
└── package.json
```
