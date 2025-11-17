# OptiMine Portal Web

Sistem Perencanaan & Distribusi Tambang untuk Mining Value Chain Optimization

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
capstone-asah/
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
│
└── package.json           # Root package.json (workspaces)
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v18 atau lebih tinggi)
- PostgreSQL (menggunakan Supabase)
- SMTP Email Account (Gmail recommended)

### 1. Clone Repository

```bash
git clone <repository-url>
cd capstone-asah
```

### 2. Install Dependencies

```bash
npm run install:all
```

Atau manual:

```bash
# Install root dependencies
npm install

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
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.yivqtafuxgqqkmuzyjqp.supabase.co:5432/postgres

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

- Ganti `[YOUR_PASSWORD]` dengan password Supabase Anda
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

#### Development Mode (Recommended)

```bash
# Run both frontend & backend
npm run dev
```

#### Manual Run

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

## 👤 Demo Accounts

Setelah menjalankan schema.sql, Anda bisa login dengan:

### Mining Planner

- **Username**: `main`
- **Email**: `main@mining.com`
- **Password**: `password123`

### Shipping Planner

- **Username**: `shipping`
- **Email**: `shipping@mining.com`
- **Password**: `password123`

**Note**: Setelah login, kode verifikasi akan dikirim ke email yang terdaftar.

## 📡 API Endpoints

### Authentication

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/api/auth/register`    | Register new user              |
| POST   | `/api/auth/login`       | Login & send verification code |
| POST   | `/api/auth/verify`      | Verify code & complete login   |
| POST   | `/api/auth/resend-code` | Resend verification code       |
| GET    | `/api/auth/me`          | Get current user (Protected)   |

### Request Examples

#### Login

```json
POST /api/auth/login
{
  "identifier": "main",
  "password": "password123"
}
```

#### Verify Code

```json
POST /api/auth/verify
{
  "identifier": "main",
  "code": "123456"
}
```

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

## 📝 Best Practices Implemented

1. **Clean Code**

   - Consistent naming conventions
   - Proper code organization
   - Separation of concerns

2. **DRY Principle**

   - Reusable components
   - Shared utilities
   - Common middleware

3. **Security First**

   - Environment variables for sensitive data
   - Password hashing
   - JWT authentication
   - Input validation
   - Rate limiting

4. **Scalable Architecture**
   - Modular structure
   - Clear separation of frontend & backend
   - Redux for state management
   - RESTful API design

## 🐛 Troubleshooting

### Database Connection Error

- Pastikan DATABASE_URL benar
- Check apakah Supabase project sudah aktif
- Verify password di connection string

### Email Not Sending

- Pastikan SMTP credentials benar
- Check Gmail App Password (bukan password biasa)
- Verify SMTP_HOST dan SMTP_PORT

### CORS Error

- Check FRONTEND_URL di backend .env
- Pastikan frontend running di port 5173

## 📚 Development Notes

- Backend menggunakan ES Modules (`type: "module"`)
- Frontend menggunakan Vite untuk fast development
- Redux Toolkit untuk state management yang efisien
- Tailwind CSS untuk styling yang consistent

## 🔄 Future Enhancements

- [ ] Forgot password functionality
- [ ] Email verification on registration
- [ ] Refresh token implementation
- [ ] Advanced logging system
- [ ] Unit & integration tests
- [ ] Docker containerization
- [ ] Production deployment guides

## 📄 License

Private - Capstone Project

## 👥 Credits

Developed for Mining Value Chain Optimization capstone project.

---

**Happy Coding! 🚀**
