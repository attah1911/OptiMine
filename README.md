# OptiMine Portal Web

Sistem Perencanaan & Distribusi Tambang untuk Mining Value Chain Optimization (OptiMine)

## 📋 Deskripsi

Aplikasi ini dirancang untuk mengelola perencanaan dan distribusi tambang dengan dua role utama:

- **Mining Planner**: Mengelola perencanaan produksi dan optimasi value chain
- **Shipping Planner**: Mengelola distribusi dan logistik pengiriman

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- Tailwind CSS
- Redux Toolkit (State Management)
- React Router DOM
- Axios
- React Hot Toast

### Backend

- Node.js & Express.js
- PostgreSQL (Supabase)
- JWT Authentication
- Nodemailer (2FA via Email)
- Bcryptjs (Password Hashing)
- Express Validator

## ✨ Fitur

- ✅ Login dengan Email/Username
- ✅ 2FA Verification via Email
- ✅ Role-based Access Control (Mining Planner & Shipping Planner)
- ✅ Protected Routes
- ✅ Separate Dashboards untuk setiap role
- ✅ JWT Token Authentication
- ✅ Secure Password Hashing
- ✅ Rate Limiting & Security Headers

## 📁 Struktur Project

```
OptiMine/
├── backend/                 # Backend API (Express.js)
│   ├── src/
│   │   ├── config/         # Database & Email configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── routes/         # API routes
│   │   ├── database/       # Database schema & migrations
│   │   └── server.js       # Entry point
│   └── package.json
│
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store & slices
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18 atau lebih tinggi)
- PostgreSQL (menggunakan Supabase)
- SMTP Email Account (Gmail recommended)

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Setup Database (Supabase)

1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Buka SQL Editor
3. Copy & paste isi file `backend/src/database/schema.sql`
4. Execute query untuk membuat tables dan demo users

### 4. Setup Environment Variables

#### Backend (.env)

Buat file `backend/.env` dengan isi:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (Supabase PostgreSQL)
DATABASE_URL=your_database_url_from_supabase

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here

# Application Configuration
FRONTEND_URL=http://localhost:5173
VERIFICATION_CODE_EXPIRES_IN=10
```

**Penting:**

- Ganti `your_database_url_from_supabase` dengan URI dari supabase anda
- Ganti `JWT_SECRET` dengan secret key yang aman
- Setup Gmail App Password untuk SMTP (bukan password biasa)

#### Frontend (.env)

Buat file `frontend/.env` dengan isi:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Setup Gmail App Password (untuk SMTP)

1. Login ke Google Account
2. Buka [App Passwords](https://myaccount.google.com/apppasswords)
3. Pilih "Mail" dan "Other (Custom name)"
4. Generate password
5. Copy password tersebut ke `SMTP_PASS` di backend `.env`

### 6. Run Application

Terminal 1 (Backend):

```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

### 7. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📡 API Endpoints

### Authentication

| Method | Endpoint                    | Description                    |
| ------ | ----------------------------| ------------------------------ |
| POST   | `/api/auth/register`        | Register new user (disabled)   |
| POST   | `/api/auth/login`           | Login & send verification code |
| POST   | `/api/auth/verify`          | Verify code & complete login   |
| POST   | `/api/auth/resend-code`     | Resend verification code       |
| POST   | `/api/auth/forgot-password` | Feature Forgot Password        |
| POST   | `/api/auth/reset-password`  | Feature Reset Password         |
| GET    | `/api/auth/me`              | Get current user (Protected)   |


## 🔒 Security Features

- Password hashing dengan bcryptjs
- JWT token-based authentication
- 2FA verification via email
- Rate limiting (100 requests per 15 minutes)
- Helmet.js security headers
- CORS protection
- Input validation dengan express-validator
- SQL injection protection dengan parameterized queries

## 🎨 Design System

### Colors

- **Primary**: #667761 (Sage green)
- **Primary Light**: #8a9a7f
- **Primary Dark**: #4a5545

### Typography

- Font Family: Inter

## 📚 Development Notes

- Backend menggunakan ES Modules (`type: "module"`)
- Frontend menggunakan Vite untuk fast development
- Redux Toolkit untuk state management yang efisien
- Tailwind CSS untuk styling yang consistent

## 👥 Credits

Developed for Mining Value Chain Optimization capstone project.

---
