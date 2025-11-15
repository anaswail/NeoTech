# 🛒 NeoTech

<div align="center">

**A Modern Electronics E-Commerce Platform**

*A full-stack e-commerce solution for electronics retail with comprehensive user and admin features*

[Live Demo](https://neotech-anas.vercel.app/) 

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Roadmap](#-roadmap)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🎯 Overview

E-Store is a sophisticated, fully responsive e-commerce platform designed specifically for electronics retail. Built with modern web technologies and best practices, it delivers a seamless shopping experience across all devices while providing robust administrative capabilities.

**Development Team:**
- **Anas Wael** — Frontend Architecture & Development
- **Hager Gamal** — Backend Architecture & API Development

🎨 Design Philosophy
The UI/UX design was inspired by this Figma e-commerce template and extensively customized to align with our project requirements, brand identity, and technical architecture. We adapted and enhanced the original design concept to create a unique, flexible interface optimized for electronics retail.
> **🎓 Project Status:** This is a training/portfolio project demonstrating full-stack development capabilities. Payment integration is implemented but disabled in the demo environment for security purposes.

---

## ✨ Key Features

### 🛍️ Customer Experience

<table>
<tr>
<td width="50%">

**Shopping Features**
- 🔍 Advanced product search and filtering
- 📂 Category-based navigation
- 🛒 Real-time cart management
- ❤️ Wishlist functionality
- 📱 Fully responsive design
- 🖼️ Product image galleries with variations

</td>
<td width="50%">

**Account Management**
- 🔐 Secure authentication system
- ✉️ Email verification
- 👤 Profile customization
- 📦 Order history tracking
- 🔄 Password recovery
- 📊 User dashboard

</td>
</tr>
</table>

### 🎛️ Admin Dashboard

- **Product Management** — Create, edit, and delete products with image upload
- **Order Tracking** — Monitor and manage customer orders
- **Customer Insights** — View and manage user accounts
- **Analytics Overview** — Business metrics and performance indicators
- **Search & Pagination** — Efficient data browsing capabilities

### 💳 Payment System (Staged for Production)

- Fully implemented Visa checkout API integration
- Secure payment processing architecture
- Ready for activation in production environment

---

## 🛠️ Tech Stack

### Frontend

```typescript
{
  "framework": "React 18.x",
  "language": "TypeScript 5.x",
  "build": "Vite 5.x",
  "styling": "TailwindCSS 3.x",
  "ui-components": "shadcn/ui",
  "state-management": "Redux Toolkit",
  "form-handling": "react-hook-form + zod",
  "http-client": "axios",
  "notifications": "react-hot-toast",
  "icons": "lucide-react"
}
```

### Backend Integration

- RESTful API architecture
- JWT-based authentication
- Role-based access control
- File upload handling
- Email service integration

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    E-Store Platform                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React UI   │  │    Redux     │  │   Routing    │  │
│  │  Components  │◄─┤    Store     │◄─┤   System     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │
│         │                  │                             │
│         ▼                  ▼                             │
│  ┌──────────────────────────────┐                       │
│  │      Axios HTTP Client       │                       │
│  └─────────────┬────────────────┘                       │
│                │                                         │
└────────────────┼─────────────────────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Backend API │
         │   (REST)      │
         └───────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 (or pnpm >= 8.0.0)
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anaswail/e-store.git
   cd e-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_backend_api_url
   VITE_STRIPE_PUBLIC_KEY=your_stripe_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

---

## 📁 Project Structure

```
e-store/
│
├── public/                 # Static assets
│
├── src/
│   ├── assets/            # Images, fonts, and media
│   │
│   ├── axios/             # HTTP client configuration
│   │   └── axiosApi.ts
│   │
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── cart/         # Cart-related components
│   │   ├── product/      # Product display components
│   │   └── layout/       # Layout components
│   │
│   ├── hooks/            # Custom React hooks
│   │
│   ├── layouts/          # Page layout templates
│   │
│   ├── lib/              # Utility functions and helpers
│   │
│   ├── pages/            # Route pages
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── auth/        # Authentication pages
│   │   ├── profile/     # User profile pages
│   │   ├── HomePage.tsx
│   │   ├── AllProducts.tsx
│   │   ├── ProductDetails.tsx
│   │   └── ...
│   │
│   ├── routes/           # Route configuration
│   │
│   ├── store/            # Redux store configuration
│   │   ├── slices/      # Redux slices
│   │   └── store.ts
│   │
│   ├── types/            # TypeScript type definitions
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example          # Environment variables template
├── components.json       # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🔌 API Integration

The frontend communicates with a custom-built REST API developed by **Hager Gamal**.

### Current Endpoints

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ Active | Login, register, email verification |
| Products | ✅ Active | CRUD operations, search, filtering |
| Cart | ✅ Active | Add, update, remove items |
| User Profile | ✅ Active | Update details, avatar upload |
| Admin Panel | ✅ Active | Product management |
| Orders | 🔄 Static | Dynamic implementation in Phase 2 |
| Wishlist | 🔄 Static | Dynamic implementation in Phase 2 |
| Payment | 🔒 Disabled | Fully coded, staged for production |

---

## 🗺️ Roadmap

### Phase 2 — Advanced Features

- [ ] **Payment Activation** — Enable secure Visa/Mastercard processing
- [ ] **Dynamic Wishlist** — Real-time wishlist synchronization
- [ ] **Order Management** — Complete order lifecycle tracking
- [ ] **Advanced Analytics** — Revenue, conversion, and customer insights
- [ ] **Role-Based Access** — Multiple admin permission levels
- [ ] **Performance Optimization** — Code splitting, lazy loading, caching
- [ ] **Testing Suite** — Unit tests, integration tests, E2E tests
- [ ] **Multi-language Support** — Internationalization (i18n)
- [ ] **Product Reviews** — Customer ratings and feedback system
- [ ] **Live Chat Support** — Real-time customer service

---

## 👥 Contributors

<table>
<tr>
<td align="center">
<a href="https://github.com/anaswail">
<img src="https://github.com/anaswail.png" width="100px;" alt="Anas Wael"/><br />
<sub><b>Anas Wael</b></sub>
</a><br />
<sub>Frontend Developer</sub>
</td>
<td align="center">
    <a href="https://github.com/Hagar-Elessawy0">
<img src="https://avatars.githubusercontent.com/u/175347500?v=4" width="100px;" alt="Hager Gamal"/><br />
<sub><b>Hager Gamal</b></sub>
<br />
<sub>Backend Developer</sub>
</td>
</tr>
</table>

---

## 📬 Contact & Support

**Anas Wael**
- 📧 Email: anaswail246@gmail.com
- 🐙 GitHub: [@anaswail](https://github.com/anaswail)
- 💼 LinkedIn: [Anas Wael](https://www.linkedin.com/in/anas-wael/)

For bug reports or feature requests, please open an issue on GitHub.

---

## 📄 License

This project is developed for educational and portfolio purposes.

```
MIT License

Copyright (c) 2025 Anas Wael & Hager Gamal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

<div align="center">

**Built with ❤️ by Anas Wael & Hager Gamal**

⭐ Star this repository if you find it helpful!

</div>
