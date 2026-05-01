<div align="center">

<h1>🛒 NeoTech — Full-Stack E-Commerce Platform</h1>

<p>A production-ready, full-featured e-commerce platform built with React (Vite) + TypeScript, featuring a powerful admin dashboard, secure authentication, real-time order management, and seamless payment integration.</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p>
  <a href="https://github.com/anaswail/NeoTech"><strong>GitHub Repository</strong></a> ·
  <a href="https://www.linkedin.com/in/anas-wael/"><strong>Developer — Anas Wael</strong></a>
</p>

</div>

---

## 📌 Overview

**NeoTech** is a full-stack e-commerce application built as a portfolio project in collaboration with backend engineer **Hagar Gamal**. It covers the complete shopping lifecycle — from browsing products and managing a cart, to checkout with payment, order tracking, and a full-featured admin dashboard.

The platform is designed to reflect real-world production standards: clean architecture, token-based authentication with automatic refresh, role-based access control, and a responsive UI.

---

## ✨ Features

### 🧑‍💻 Customer Side
- **Authentication** — Register, login, email verification, forgot/reset password, Google OAuth
- **Product Browsing** — All products, category filtering, product detail pages, slick carousels
- **Cart & Wishlist** — Add/remove items, persist state with Redux
- **Checkout** — Integrated with **Paymob** payment gateway
- **User Profile**
  - Edit name, email, password, and avatar
  - View order history with live status tracking
  - Cancel or request refunds on orders
  - Manage wishlist

### 🛠️ Admin Dashboard
- **Overview** — Sales summaries, customer counts, top-selling products, latest orders
- **Products** — Add, edit, delete products; manage categories; view product details
- **Orders** — View all orders, update order/payment/shipment status manually or automatically
- **Users** — View customer data, ban/unban users, delete accounts
- **Admins** — Add, delete, ban/unban admin accounts (Super Admin access)

---

## 🧱 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI |
| **State Management** | Redux Toolkit |
| **Forms & Validation** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **Auth** | JWT + Refresh Tokens (auto-refresh) + Google OAuth |
| **Payment** | Paymob |
| **Notifications** | React Hot Toast, SweetAlert2 |
| **Icons** | Font Awesome, Lucide React |
| **Carousels** | React Slick |
| **Deployment** | Vercel (Frontend) |

---

## 🗂️ Project Structure

```
NeoTech/
├── public/
└── src/
    ├── assets/
    ├── axios/
    │   └── axiosApi.ts             # Axios instance with interceptors
    ├── components/                 # Reusable UI components
    │   ├── AuthForm.tsx
    │   ├── Card.tsx
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   └── ui/                     # shadcn/ui components
    ├── hooks/
    │   └── useTokenRefreshManager.ts
    ├── layouts/
    │   └── MainLayout.tsx
    ├── pages/
    │   ├── admin/                  # Dashboard pages
    │   │   ├── Overview.tsx
    │   │   ├── Orders.tsx
    │   │   ├── Customers.tsx
    │   │   ├── Admins.tsx
    │   │   └── ProductCRUD.tsx
    │   ├── auth/                   # Auth pages
    │   │   ├── Login.tsx
    │   │   ├── SignUp.tsx
    │   │   ├── VerifyEmail.tsx
    │   │   ├── ForgetPassword.tsx
    │   │   └── ResetPassword.tsx
    │   └── profile/                # User profile pages
    │       ├── MyProfile.tsx
    │       ├── LastOrders.tsx
    │       └── WishList.tsx
    ├── routes/
    │   └── AppRouter.tsx
    ├── store/
    │   ├── store.ts
    │   └── slices/
    │       ├── auth/
    │       ├── admin/
    │       ├── orders/
    │       ├── products/
    │       └── profile/
    ├── types/
    │   └── index.ts
    └── utils/
```

---

## 🔐 Authentication & Security

- **JWT Access + Refresh Token** architecture with automatic silent token refresh
- Configurable refresh interval (default: 15 min), retry attempts (default: 3), and retry delay (default: 5s)
- **Google OAuth** integration
- Email verification on registration
- Role-based route protection (user / admin / super admin)

---

## ⚙️ Environment Variables

Create a `.env.local` file at the root of the project:

```env
# API
VITE_BASE_URL=https://your-backend-url.com/

# Token refresh settings
VITE_REFRESH_INTERVAL=900000        # 15 minutes in ms
VITE_MAX_RETRY_ATTEMPTS=3
VITE_RETRY_DELAY=5000               # 5 seconds in ms
```

> ⚠️ Never commit `.env.local` to version control. It is already listed in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/anaswail/NeoTech.git
cd NeoTech

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔄 State Management Patterns

This project uses **Redux Toolkit** with a consistent pattern across all async features:

- Each feature has its own **slice** under `store/slices/`
- Async operations are handled with `createAsyncThunk` in a dedicated `act/` folder per domain
- State shape follows: `{ data, loading, error }` for predictable rendering
- The Axios instance handles **request/response interceptors** for token injection and error normalization

---

## 🤝 Team

| Role | Name | Profile |
|---|---|---|
| Frontend Developer | **Anas Wael** | [LinkedIn](https://www.linkedin.com/in/anas-wael/) · [GitHub](https://github.com/anaswail) |
| Backend Developer | **Hagar Gamal** | [LinkedIn](https://www.linkedin.com/in/hagar-e-64b44b1b4/) · [GitHub](https://github.com/Hagar-Elessawy0) |

---

## 📚 What I Learned

A dedicated patterns and learnings log from this project is documented on Notion:

📓 [View Patterns & Notes](https://www.notion.so/Patterns-29adef5f641d807e8c22f4c99f5d3239?source=copy_link)

Key areas covered: component architecture, Redux patterns, async state management, JWT auth flows, role-based access, and API integration strategies.

---

## 📄 License

This project is built for portfolio purposes. All rights reserved © Anas Wael.
