# Frontend - OptiMine Portal

React + Vite application dengan Tailwind CSS dan Redux Toolkit.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Setup environment variables (`.env`):

```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Features

- ✅ Login with 2FA verification
- ✅ Role-based dashboards
- ✅ Protected routes
- ✅ Redux state management
- ✅ Responsive design with Tailwind CSS

## Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── hooks/          # Hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── utils/          # Utils
│   ├── App.jsx         # Main app
│   └── main.jsx        # Entry point
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
