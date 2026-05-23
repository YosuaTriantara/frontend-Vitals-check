# VitalsCheck Frontend — Next.js Application

Frontend UI/UX untuk sistem deteksi dini risiko Penyakit Tidak Menular (PTM) dengan dashboard interaktif dan form screening kesehatan.

**Project**: CC26-PSU319 | Coding Camp 2026  
**Stack**: Next.js 14+, React 18, TypeScript, Tailwind CSS, Zod

---

## 📋 Quick Start

### Prerequisites
- Node.js 16+
- npm atau yarn
- Backend API running (`http://localhost:5000/api`)

### 1. Setup Project

```bash
# Navigate ke folder frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

### 2. Configure Environment

Edit `.env.local` dengan nilai API backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Catatan**:
- `NEXT_PUBLIC_*` variables accessible di browser (gunakan untuk public config)
- Server-side only env (dengan prefix `DATABASE_URL`, etc) tidak accessible di browser

### 3. Start Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🎯 Features

- ✅ **Authentication** — Login/Register dengan JWT
- ✅ **Health Screening** — Form input data kesehatan (age, BP, glucose, BMI)
- ✅ **Risk Dashboard** — Visualisasi risk category & score dengan gauge chart
- ✅ **Screening History** — Daftar riwayat screening dengan sorting & filtering
- ✅ **Recommendations** — Rekomendasi preventif berdasarkan risk category
- ✅ **Route Protection** — Middleware untuk protect authenticated routes
- ✅ **Error Handling** — User-friendly error messages & retry logic

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Public routes (login, register)
│   │   ├── (app)/               # Protected routes (dashboard, screening)
│   │   └── layout.tsx           # Root layout
│   ├── components/              # Reusable React components
│   │   ├── ui/                  # Base UI components
│   │   ├── form/                # Form components
│   │   ├── dashboard/           # Dashboard components
│   │   └── charts/              # Chart visualizations
│   ├── hooks/                   # Custom React hooks
│   ├── context/                 # React Context for state
│   ├── lib/                     # Utilities (API client, validation, constants)
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Helper functions
│   ├── middleware.ts            # Next.js middleware (route protection)
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── .env.local.example           # Environment template
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json
└── README.md                    # (This file)
```

Lihat [src/STRUCTURE.md](./src/STRUCTURE.md) untuk dokumentasi detail setiap folder.

---

## 🔗 Pages & Routes

### Public Routes (No Authentication Required)
```
/                   # Landing page
/login              # Login form
/register           # Register form
```

### Protected Routes (Authentication Required)
```
/dashboard          # Main dashboard dengan hasil screening
/screening          # Form input screening baru
/history            # Riwayat semua screening
```

**Route Protection**: Implemented di `src/middleware.ts` — user belum login akan redirect ke `/login`

---

## 🎨 UI Components

### Base Components (`src/components/ui/`)
- `Button` — Reusable button dengan variants
- `Input` — Text input dengan validation feedback
- `Card` — Container card
- `Badge` — Tag/label untuk categories
- `Modal` — Dialog modal

### Feature Components
- `ScreeningForm` — Main form screening (src/components/form/)
- `RiskCard` — Display risk category & score (src/components/dashboard/)
- `RiskGauge` — Gauge chart untuk visualisasi (src/components/charts/)
- `RecommendationList` — List rekomendasi kesehatan

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server (auto-reload)
npm run build        # Build untuk production
npm start            # Run production build
npm run lint         # Lint dengan ESLint
npm run type-check   # TypeScript type checking
```

### Code Style
- **Formatter**: Prettier (auto on save jika VS Code extension installed)
- **Linter**: ESLint dengan Next.js config
- **Language**: TypeScript strict mode

---

## 🔐 Authentication Flow

```
1. User visit /login
2. Input email & password
3. Submit → POST /api/auth/login ke backend
4. Backend return JWT token & user data
5. Frontend save token ke localStorage/cookie
6. Attach token ke setiap request: Authorization: Bearer <token>
7. Backend verify token di auth.middleware
8. Redirect ke /dashboard
```

**Token Management**:
- Disimpan di `localStorage` (dapat di-improve ke httpOnly cookie)
- Di-attach otomatis di `lib/api.ts` ke setiap request
- Dihapus saat logout

---

## 📊 Form Validation

Menggunakan **Zod** + **React Hook Form**:

```tsx
// Define schema
const screeningSchema = z.object({
  age: z.number().int().min(1).max(150),
  gender: z.enum(['male', 'female']),
  // ... fields lain
});

// Use di form
const { register, errors } = useForm({
  resolver: zodResolver(screeningSchema)
});
```

**Validation terjadi di**:
1. Frontend (Zod) — instant user feedback
2. Backend (Joi/Zod) — security (jangan trust browser)

---

## 🌐 API Integration

**API Client** (`src/lib/api.ts`):
```ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Interceptor untuk attach token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Usage di components**:
```tsx
const { data } = await apiClient.get('/screenings');
```

---

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. Push code ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy ✅

### Other Hosting
- Netlify, AWS Amplify, Railway, etc — semua support Next.js

**Build Output**:
```bash
npm run build        # Generate optimized build di .next/
npm start            # Run production server
```

---

## 📚 Documentation

- **[src/STRUCTURE.md](./src/STRUCTURE.md)** — Detail dokumentasi struktur folder & components
- **[../VITALSCHECK_IMPLEMENTATION_GUIDE.md](../VITALSCHECK_IMPLEMENTATION_GUIDE.md)** — Overall project architecture

---

## 💾 State Management

Menggunakan **React Context API** (simple) + **React Hooks**:

```tsx
// AuthContext untuk global auth state
<AuthProvider>
  {children}
</AuthProvider>

// Usage di component
const { user, login, logout } = useAuth();
```

**Alternative** (jika kompleks): Redux, Zustand, atau Jotai

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ |
| **Runtime** | React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Forms** | React Hook Form + Zod |
| **HTTP** | Axios |
| **Charts** | Recharts |
| **State** | React Context API |

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Gunakan port berbeda
npm run dev -- -p 3001
```

### CORS Error saat fetch API
- Pastikan backend sudah setup CORS di `app.js`
- Pastikan `NEXT_PUBLIC_API_URL` benar di `.env.local`

### Token expired/invalid
```bash
# Clear localStorage
localStorage.clear()

# Login ulang
```

### Build error: `Cannot find module`
```bash
# Reinstall dependencies
rm -rf node_modules .next
npm install
npm run build
```

---

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Validation](https://zod.dev/)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/xyz`
2. Make changes & test locally
3. Commit: `git commit -m "Add xyz feature"`
4. Push: `git push origin feature/xyz`
5. Create Pull Request

---

## 📝 Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Production (Vercel/Netlify)
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

---

## 📞 Support

Lihat [src/STRUCTURE.md](./src/STRUCTURE.md) untuk documentasi detail atau buat issue di GitHub.

---

**Last Updated**: May 21, 2026  
**Maintained by**: CC26-PSU319 TeamV