# Frontend VitalsCheck — Updated Directory Structure (v2.0)

**Dokumentasi lengkap struktur direktori frontend Next.js 14+ dengan updated user journey.**

**Last Updated**: May 21, 2026 (Post User Journey Clarification)

---

## 📂 Complete Updated Structure

```
frontend/src/
│
├── app/
│   ├── page.tsx                              # Landing page (public)
│   ├── error.tsx                             # Error boundary
│   ├── not-found.tsx                         # 404 page
│   │
│   ├── (auth)/                               # PUBLIC route group
│   │   ├── login/
│   │   │   └── page.tsx                      # Login form
│   │   ├── register/
│   │   │   └── page.tsx                      # Register form
│   │   ├── loading.tsx                       # Loading skeleton
│   │   └── layout.tsx                        # Auth layout (no navbar)
│   │
│   ├── results/                              # RESULTS after screening
│   │   ├── [id]/
│   │   │   ├── page.tsx                      # Display results + recommendations
│   │   │   └── loading.tsx
│   │   └── layout.tsx
│   │
│   ├── (app)/                                # PROTECTED route group
│   │   ├── layout.tsx                        # Main layout with navbar
│   │   ├── loading.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx                      # Main dashboard (+ onboarding modal)
│   │   │   └── loading.tsx
│   │   │
│   │   ├── screening/                        # "Risk Detection" menu item
│   │   │   ├── page.tsx                      # New screening form
│   │   │   └── loading.tsx
│   │   │
│   │   ├── health-data/                      # "Health Data" menu item - HISTORY
│   │   │   ├── page.tsx                      # List all screenings
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx                  # Detail screening page
│   │   │   │   └── loading.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── profile/                          # OPTIONAL - User profile
│   │       ├── page.tsx                      # User settings & info
│   │       └── loading.tsx
│   │
│   └── middleware.ts                         # Route protection + onboarding redirect
│
├── components/
│   ├── layout/                               # NEW! Layout wrapper components
│   │   ├── Navbar.tsx                        # Top navigation with 3 menu items
│   │   ├── NavbarItem.tsx                    # Individual navbar menu item
│   │   ├── ProfileMenu.tsx                   # Profile dropdown menu
│   │   ├── Sidebar.tsx                       # Optional sidebar (can hide on mobile)
│   │   └── Footer.tsx                        # Footer component
│   │
│   ├── modals/                               # NEW! Modal/Popup components
│   │   ├── OnboardingModal.tsx               # Guided onboarding overlay
│   │   │   ├─ Instructions/steps
│   │   │   ├─ Health form inside modal
│   │   │   └─ Submit button
│   │   ├── ConfirmationModal.tsx             # Generic confirmation modal
│   │   └── AlertModal.tsx                    # Generic alert modal
│   │
│   ├── auth/                                 # NEW! Auth-specific components
│   │   ├── LoginForm.tsx                     # Extracted from page.tsx
│   │   ├── RegisterForm.tsx                  # Extracted from page.tsx
│   │   └── AuthLayout.tsx                    # Layout for auth pages
│   │
│   ├── forms/
│   │   ├── ScreeningForm.tsx                 # SHARED form (onboarding + new screening)
│   │   │   ├─ Age, Gender inputs
│   │   │   ├─ Height, Weight inputs
│   │   │   ├─ BP (systolic, diastolic) inputs
│   │   │   ├─ Blood Glucose input
│   │   │   └─ Submit button
│   │   └── FormField.tsx                     # Wrapper for input + label + error
│   │
│   ├── dashboard/                            # Dashboard-specific components
│   │   ├── LastScreeningCard.tsx             # Shows last screening summary
│   │   │   ├─ Date of screening
│   │   │   ├─ Risk category & score
│   │   │   └─ Last vital signs
│   │   ├── HealthTrendChart.tsx              # Line chart showing trends
│   │   │   ├─ Risk score trend (5 screenings)
│   │   │   ├─ BMI trend
│   │   │   └─ BP trend
│   │   ├── QuickStats.tsx                    # Summary statistics
│   │   │   ├─ Days since last screening
│   │   │   ├─ Screening frequency
│   │   │   └─ Overall health status
│   │   └── DashboardLayout.tsx               # Layout wrapper for dashboard
│   │
│   ├── health-data/                          # NEW! Health history components
│   │   ├── ScreeningList.tsx                 # Table/list of all screenings
│   │   │   ├─ Date, risk category, risk score
│   │   │   ├─ Sortable columns
│   │   │   └─ Click to view detail
│   │   ├── ScreeningCard.tsx                 # Card view for screenings
│   │   ├── ScreeningDetail.tsx               # Detail page for one screening
│   │   │   ├─ All metrics (age, height, weight, BP, glucose)
│   │   │   ├─ Risk score & category
│   │   │   ├─ Recommendations from that date
│   │   │   └─ Compare with other screenings (optional)
│   │   ├── ScreeningFilters.tsx              # Filter & sort options
│   │   │   ├─ Date range filter
│   │   │   ├─ Risk category filter
│   │   │   └─ Sort options
│   │   ├── HealthDataTable.tsx               # Table layout for screenings
│   │   └── ComparisonChart.tsx               # Compare 2+ screenings (optional)
│   │
│   ├── results/                              # NEW! Results page components
│   │   ├── ResultsSummary.tsx                # Risk card + summary
│   │   │   ├─ Risk score gauge
│   │   │   ├─ Risk category badge
│   │   │   ├─ BMI category
│   │   │   └─ BP reading
│   │   ├── RecommendationsPanel.tsx          # List of recommendations
│   │   │   ├─ Personalized tips
│   │   │   ├─ Risk factor explanation
│   │   │   └─ Prevention actions
│   │   └── DashboardButton.tsx               # "Go to Dashboard" CTA
│   │
│   ├── ui/                                   # Base UI components (unstyled)
│   │   ├── Button.tsx                        # Primary button with variants
│   │   ├── Input.tsx                         # Text input with validation
│   │   ├── Select.tsx                        # Dropdown select
│   │   ├── Card.tsx                          # Card container
│   │   ├── Badge.tsx                         # Tag/label (risk category)
│   │   ├── Modal.tsx                         # Modal container
│   │   ├── Table.tsx                         # Table component
│   │   ├── Tabs.tsx                          # Tab navigation
│   │   ├── Pagination.tsx                    # Pagination controls
│   │   ├── Spinner.tsx                       # Loading spinner
│   │   └── Alert.tsx                         # Alert/notification
│   │
│   └── charts/
│       ├── RiskGauge.tsx                     # Gauge chart for risk score (0-1)
│       └── TrendChart.tsx                    # Line chart for trends (Recharts)
│
├── hooks/                                    # Custom React hooks
│   ├── useAuth.ts                            # Auth state (user, token, login, logout, isOnboarded)
│   ├── useScreening.ts                       # Screening CRUD (create, read, list, delete)
│   ├── useOnboarding.ts                      # Onboarding flow (show/hide modal)
│   ├── useTrends.ts                          # Calculate trends from screening history
│   ├── useHealthData.ts                      # Manage health history data
│   ├── useFetch.ts                           # Generic fetch hook with error handling
│   └── useNavigation.ts                      # Handle navbar navigation state
│
├── context/
│   ├── AuthContext.tsx                       # Global auth state
│   │   ├─ user info
│   │   ├─ token
│   │   ├─ isOnboarded flag
│   │   └─ login/logout functions
│   └── OnboardingContext.tsx                 # NEW! Onboarding modal state
│       ├─ showModal flag
│       ├─ currentStep
│       └─ handleClose function
│
├── lib/
│   ├── api.ts                                # Axios client to backend
│   │   ├─ Base URL configuration
│   │   ├─ Auth token interceptor
│   │   └─ Error handling
│   ├── validations.ts                        # Zod schemas for form validation
│   │   ├─ screeningSchema (age, gender, height, weight, BP, glucose)
│   │   ├─ loginSchema
│   │   ├─ registerSchema
│   │   └─ profileSchema
│   └── constants.ts                          # App constants
│       ├─ Risk categories
│       ├─ BMI ranges
│       ├─ Navbar menu items
│       └─ API endpoints
│
├── types/
│   ├── screening.ts                          # Screening & related types
│   │   ├─ Screening interface
│   │   ├─ ScreeningRequest
│   │   ├─ ScreeningResponse
│   │   └─ RiskCategory type
│   ├── user.ts                               # User-related types
│   │   ├─ User interface (with isOnboarded)
│   │   ├─ LoginRequest
│   │   ├─ RegisterRequest
│   │   └─ UserProfile
│   ├── health.ts                             # Health data types
│   │   ├─ HealthMetrics
│   │   ├─ HealthTrend
│   │   └─ HealthStats
│   └── api.ts                                # API response types
│       ├─ ApiResponse
│       ├─ ApiError
│       └─ PaginationMeta
│
├── utils/
│   ├── formatters.ts                         # Format functions
│   │   ├─ formatDate()
│   │   ├─ formatBMI()
│   │   ├─ formatRiskScore()
│   │   └─ formatNumber()
│   ├── storage.ts                            # LocalStorage helpers
│   │   ├─ setToken()
│   │   ├─ getToken()
│   │   ├─ clearAuth()
│   │   └─ setOnboardingStatus()
│   ├── calculations.ts                       # NEW! Health calculation utils
│   │   ├─ calculateBMI()
│   │   ├─ getBMICategory()
│   │   ├─ getBPCategory()
│   │   └─ calculateTrend()
│   └── validators.ts                         # NEW! Validation helpers
│       ├─ validateAge()
│       ├─ validateHeight()
│       ├─ validateWeight()
│       └─ validateBloodGlucose()
│
├── middleware.ts                             # Next.js middleware
│   ├─ Route protection (login check)
│   ├─ Onboarding redirect (isOnboarded check)
│   └─ Token validation
│
├── styles/
│   └── globals.css                           # Global styles + Tailwind directives
│
└── public/                                   # Static assets
    ├── images/
    │   ├── logo.png
    │   ├── landing-hero.svg
    │   └── healthcare-icons/
    └── fonts/ (if custom fonts)
```

---

## 🔄 Component Usage Map

### **ScreeningForm (Shared Component)**

Used in 2 places:
```
1. OnboardingModal.tsx
   ├─ Inside modal overlay
   ├─ Show during first login
   └─ Submit triggers POST /api/screenings?isOnboarding=true

2. /screening/page.tsx
   ├─ Full page form
   ├─ Show when user clicks "Risk Detection"
   └─ Submit triggers POST /api/screenings
```

### **Results Page**

Shown after:
```
1. First screening (onboarding)
   → /results/:id?source=onboarding
   → Show "Go to Dashboard" button

2. New screening from /screening
   → /results/:id?source=new
   → Show "Go to Dashboard" button
   
Same display, different context
```

### **Dashboard Modal Logic**

```
Dashboard Page (/dashboard):
  ├─ Load user data
  ├─ Check isOnboarded from context/cookie
  ├─ If true: Show dashboard normally
  ├─ If false: Show OnboardingModal overlay
  │            └─ ScreeningForm inside modal
  │            └─ Submit → Update isOnboarded
  │            └─ Close modal → Show dashboard
  └─ Navbar visible throughout (behind modal)
```

---

## 📋 File Purposes Summary

### **Pages (Routes)**

| File | Purpose | Type |
|------|---------|------|
| `app/page.tsx` | Landing page | Public |
| `app/(auth)/login/page.tsx` | Login form | Public |
| `app/(auth)/register/page.tsx` | Register form | Public |
| `app/(app)/dashboard/page.tsx` | Main dashboard | Protected |
| `app/(app)/screening/page.tsx` | New screening form | Protected |
| `app/(app)/health-data/page.tsx` | History list | Protected |
| `app/(app)/health-data/[id]/page.tsx` | Detail screening | Protected |
| `app/(app)/profile/page.tsx` | User profile | Protected |
| `app/results/[id]/page.tsx` | Results display | Protected |

### **Layout Components**

| File | Purpose |
|------|---------|
| `components/layout/Navbar.tsx` | Top navigation |
| `components/layout/Sidebar.tsx` | Side navigation (optional) |
| `components/layout/Footer.tsx` | Footer |

### **Modal Components**

| File | Purpose |
|------|---------|
| `components/modals/OnboardingModal.tsx` | Onboarding guidance overlay |
| `components/modals/ConfirmationModal.tsx` | Generic confirmation |
| `components/modals/AlertModal.tsx` | Generic alert |

### **Feature Components**

| File | Purpose |
|------|---------|
| `components/dashboard/LastScreeningCard.tsx` | Last screening summary |
| `components/dashboard/HealthTrendChart.tsx` | Trend visualization |
| `components/health-data/ScreeningList.tsx` | All screenings list |
| `components/results/ResultsSummary.tsx` | Results display |

---

## 🎨 Navbar Structure

```
Navbar Component
├─ Logo / Brand
├─ Menu Items (when authenticated + onboarded):
│   ├─ Dashboard (link to /dashboard)
│   ├─ Risk Detection (link to /screening)
│   └─ Health Data (link to /health-data)
└─ Profile Dropdown
    ├─ View Profile
    ├─ Settings
    └─ Logout
```

---

## 🔄 New Component Relationships

```
OnboardingModal
└─ ScreeningForm
   └─ FormField (multiple)

Dashboard
├─ OnboardingModal (conditionally)
├─ LastScreeningCard
├─ HealthTrendChart
│   └─ TrendChart (Recharts)
└─ QuickStats

ResultsPage
├─ ResultsSummary
│   └─ RiskGauge
├─ RecommendationsPanel
└─ DashboardButton

HealthDataPage
├─ ScreeningFilters
├─ ScreeningList
│   └─ ScreeningCard (multiple)
└─ Pagination

HealthDataDetailPage
└─ ScreeningDetail
   ├─ All screening metrics
   ├─ Recommendations
   └─ Compare button (optional)
```

---

## 📊 New Types & Interfaces

### **types/user.ts**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;  // NEW!
  createdAt: string;
}
```

### **types/health.ts**
```typescript
interface HealthTrend {
  date: string;
  riskScore: number;
  bmi: number;
  systolicBp: number;
  diastolicBp: number;
}

interface HealthStats {
  totalScreenings: number;
  lastScreeningDate: string;
  avgRiskScore: number;
  trend: "improving" | "stable" | "declining";
}
```

### **types/api.ts**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
```

---

## 🛠️ New Hooks Purposes

### **useOnboarding.ts**
```typescript
function useOnboarding() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle onboarding form submission
  async function handleSubmit(data) { ... }
  
  // Close modal and mark as onboarded
  function closeModal() { ... }
  
  return { showModal, closeModal, handleSubmit, isSubmitting };
}
```

### **useTrends.ts**
```typescript
function useTrends(screenings: Screening[]) {
  // Calculate trends from screening history
  // Return chart data ready for Recharts
  
  return {
    riskScoreTrend: [...],
    bmiTrend: [...],
    bpTrend: [...]
  };
}
```

### **useHealthData.ts**
```typescript
function useHealthData() {
  // Fetch all screenings
  // Filter & sort
  // Handle pagination
  
  return {
    screenings,
    totalCount,
    isLoading,
    error,
    filters,
    setFilters
  };
}
```

---

## 📈 Folder Count Update (vs Previous)

| Category | Previous | Updated | Change |
|----------|----------|---------|--------|
| **Pages** | 6 | 9 | +3 |
| **Component Folders** | 7 | 14 | +7 |
| **Component Files** | ~15 | ~30 | +15 |
| **Hooks** | 3 | 6 | +3 |
| **Types Files** | 1 | 4 | +3 |
| **Utils Files** | 2 | 4 | +2 |
| **Total Folders** | 13 | 20 | +7 |

---

## 🔐 Route Protection

### **Middleware Logic**

```typescript
// app/middleware.ts

if (!isAuthenticated) {
  redirect to /login
}

if (isAuthenticated && !isOnboarded) {
  allow /dashboard to show modal
  block direct access to /screening, /health-data
  redirect to /dashboard
}

if (isAuthenticated && isOnboarded) {
  allow all protected routes
}
```

---

## ✨ Key New Features in v2.0

✅ **Onboarding Modal**: Guided overlay instead of separate page  
✅ **Navbar**: Clear 3-section navigation (Dashboard, Risk Detection, Health Data)  
✅ **Health History**: Dedicated page for all screenings  
✅ **Results Page**: Consistent display for any screening result  
✅ **Trends**: Calculated from multi-screening history  
✅ **Detail Pages**: View individual screening details  
✅ **Reusable Form**: Same ScreeningForm in 2 contexts  
✅ **Better UX**: Smooth flow from registration → onboarding → dashboard  

---

## 🎯 Migration Path (from v1.0)

| Component | v1.0 | v2.0 | Action |
|-----------|------|------|--------|
| Dashboard | Simple | Summary + Trends | Update |
| Screening Form | Page `/screening` | Modal + Page | Keep + Add |
| Results | Inline/separate | `/results/:id` | Keep |
| History | Separate page | `/health-data` | Rename |
| Navbar | None | 3 items | Add |
| Onboarding | Separate page | Modal | Change |

---

## 📚 Documentation Reference

- **User Journey**: [UPDATED_USER_JOURNEY.md](../UPDATED_USER_JOURNEY.md)
- **Visual Map**: [VISUAL_PROJECT_MAP.md](../VISUAL_PROJECT_MAP.md)
- **Quick Reference**: [QUICK_REFERENCE.md](../QUICK_REFERENCE.md)

---

**Structure Status**: ✅ Updated & Ready for Implementation  
**Complexity**: Medium (good expansion, no major refactor)  
**Dev Time**: 2.5 weeks (including new components)

