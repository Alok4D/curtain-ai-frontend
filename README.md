# 🛋️ Curtain AI AI Studio - Frontend Application

A luxury, AI-powered virtual curtain fitting and interior drapery visualization studio. Built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Redux Toolkit (RTK Query)**, this platform allows homeowners and interior designers to visualize fabrics, drapes, sheers, and roller blinds directly on their actual room windows within seconds.

---

## 🌟 Key Features & User Journeys

### 1. 🪟 Interactive AI Room Visualizer (`/generate-image`)
- **Interactive Before/After Split Slider**: Smooth drag-to-compare split view allowing users to contrast their bare room against the AI-fitted drape.
- **Scanning & Synthesis Overlay**: Real-time visual feedback with sweeping laser beam and progressive step status.
- **Custom Fit & Styling Controls**:
  - **Drape Length**: Floor-skimming, modern puddle, sill-length.
  - **Drape Arrangement**: Open framing sides, semi-closed with soft pleats, or fully closed.
  - **Curtain Rod & Hardware**: Matte black architectural rod, brushed brass gold, or hidden ceiling track.
- **Direct WhatsApp Consultation & Free Home Visit Booking**: One-click leads generation for measuring and physical swatch presentation.

### 2. 🧵 Fabric Selection Catalog (`/select-curtains`)
- **Categorized Tabs**: Instant switching between `Curtains` (heavy drapes & blackouts), `Sheers` (light-filtering linen), and `Rollers` (minimalist textured blinds).
- **Live Database Integration**: Dynamically populated from the MongoDB database via RTK Query with graceful local fallback.
- **Hover Preview Effects**: Interactive slide-up cards with instant "Preview on my room" action.
- **Room Photo Header**: Thumbnail preview of uploaded room with quick change capability.

### 3. 👑 Comprehensive Admin Dashboard (`/dashboard`)
- **Dashboard Overview (`/dashboard/dashboard-overview`)**:
  - Live metric cards: Total Registered Users, Active Curtains in Catalog, and Completed AI Visualizations.
  - Users Management Table with role badges and join dates.
  - Recent AI Previews Gallery showcasing live generated rooms.
- **Curtains Management (`/dashboard/curtains`)**:
  - Filterable catalog table with search and category tabs.
  - Direct actions to view details, edit, or delete items.
- **Dedicated Full-Page Add Fabric (`/dashboard/curtains/add-curtain`)**:
  - Supports adding fabrics via direct web URL or image upload.
  - Real-time preview swatch, material, and pricing inputs.
- **Dedicated Full-Page Edit Fabric (`/dashboard/curtains/update-curtain`)**:
  - Pre-filled inputs with live thumbnail updating.
- **Curtain Details Page (`/dashboard/curtains/[id]`)**:
  - High-resolution display of both catalog swatch and fitted room preview with complete metadata.
- **Admin Settings (`/dashboard/settings`)**:
  - Profile customization: Avatar image upload/URL, name, phone, UAE location, and studio bio.
  - Secure password management: Old vs new password validation with real-time feedback.

### 4. 🔐 Authentication System (`/login`, `/signup`, `/forgot-password`, `/reset-password`)
- **JWT Auth Flow**: Redux state synchronization with secure cookies (`js-cookie`) and local storage.
- **Protected Routes**: Automatic redirection between public visualizer and admin dashboard.
- **Forgot Password**: Fully integrated with real SMTP email dispatch.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management & Data Fetching**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Typography**: [Urbanist](https://fonts.google.com/specimen/Urbanist) Google Font (Luxury & Modern)

---

## 📁 Directory Structure

```text
curtain-ai-frontend/
├── app/
│   ├── (adminDashboardLayout)/
│   │   ├── dashboard/
│   │   │   ├── curtains/
│   │   │   │   ├── [id]/              # Single curtain detail view
│   │   │   │   ├── add-curtain/       # Full-page add fabric
│   │   │   │   ├── update-curtain/    # Full-page update fabric
│   │   │   │   └── page.tsx           # Curtains catalog table & management
│   │   │   ├── dashboard-overview/    # KPIs, user table, recent AI previews
│   │   │   └── settings/              # Admin profile & password change
│   │   └── layout.tsx                 # Dashboard sidebar & header layout
│   ├── (auth)/
│   │   ├── login/                     # Admin & user sign-in
│   │   ├── signup/                    # Account registration
│   │   ├── forgot-password/           # Password recovery request
│   │   └── reset-password/            # Secure reset token entry
│   ├── (home)/
│   │   ├── select-curtains/           # Curtains, sheers & rollers catalog
│   │   ├── generate-image/            # AI visualizer with before/after slider
│   │   └── page.tsx                   # Studio landing page
│   └── layout.tsx                     # Global root layout & Redux Provider
├── components/
│   ├── dashboard_component/           # DashboardHeader, DashboardSidebar
│   └── ui/                            # Shared inputs, buttons, skeletons
├── data/
│   └── curtains.json                  # Catalog fallback data
├── lib/
│   ├── api/
│   │   └── baseApi.ts                 # Central RTK Query Base API with bearer token headers
│   ├── feature/
│   │   ├── admin/adminApi.ts          # Admin metrics & user listings
│   │   ├── auth/                      # authApi.ts & authSlice.ts
│   │   ├── curtain/curtainApi.ts      # Curtains catalog CRUD mutations
│   │   └── visualizer/visualizerApi.ts# AI Visualizer generation mutation
│   ├── hooks/redux.ts                 # useAppDispatch & useAppSelector
│   └── redux/store.ts                 # Central store configuration
├── public/                            # Static swatches, logos, before images
├── package.json
└── next.config.ts
```

---

## ⚙️ Environment Variables Configuration

Create a `.env.local` file in the root of `curtain-ai-frontend`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   cd curtain-ai-frontend
   pnpm install
   ```

2. **Run in Development Mode**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🔑 Default Admin Credentials

- **Email**: `admin@Curtain AI.ai`
- **Password**: `admin123456`
- **Dashboard URL**: [http://localhost:3000/dashboard/dashboard-overview](http://localhost:3000/dashboard/dashboard-overview)

---

*Curtain AI AI Studio — Empowering luxury home transformations through cutting-edge AI visualization.*
