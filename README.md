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
