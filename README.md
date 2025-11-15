# E-Store — Electronics E-Commerce Platform (Training Project)

A fully responsive e-commerce web application specialized in selling electronic devices.  
Developed collaboratively by:  
- **Anas Wael** — Front-end Developer  
- **Hager Gamal** — Back-end Developer  

> **Note:** This is a training project.  
> Payment functionality (Visa checkout) is fully implemented in code and API structure, but **disabled** in the demo environment.  
> The payment function is ready to be activated once deployed to a real production backend.

---

## 🚀 Overview

E-Store is a modern and dynamic online store that allows users to:

- Browse products and filter by categories  
- Search for products  
- Add items to the cart or wishlist  
- View detailed product pages with images, variations, and stock  
- Create an account, log in, manage profile details  
- Receive an email verification link and activate the account  
- Proceed to checkout (static in training mode)

The platform includes a complete **User Profile System** and a **basic Admin Dashboard** for managing products, orders, and customers.

---

## 🖥️ Main User Pages

1. **Home Page** — Best-selling products, deals, categories, and featured items  
2. **All Products Page** — Displays all products with pagination (20 per page)  
3. **Category Page** — Shows products filtered by category with pagination  
4. **Product Details Page** — Images, variations, stock, add to cart/wishlist  
5. **Cart Page** — Review selected products before checkout  
6. **Wishlist Page** — Currently static; will be dynamic in phase 2  
7. **Checkout Page** — Displays cart summary (payment disabled)  
8. **About Page** — Information about Anas & Hager + contact details  
9. **Contact Page** — Sends a message/email  
10. **Profile Page** — User details + links to dashboard, orders, wishlist  
11. **Edit Profile Page** — Update name, email, and profile picture  
12. **Email Verification Page** — Activate the user email  
13. **Last Orders Page** — Static for now; dynamic in phase 2  
14. **Admin Dashboard** — Access restricted to admin accounts  
    - Overview (analytics — will be dynamic in phase 2)  
    - Add Product  
    - View/Edit/Delete Products + search & pagination  
    - Orders (static — to be dynamic in phase 2)  
    - Customers (static — to be dynamic in phase 2)  
15. **Forgot Password + Reset Password Pages**  
    - User receives an email with a verification link to reset the password.

---

## ⚙️ Technologies Used

- **React (Vite + TypeScript)**
- **TailwindCSS**
- **shadcn/ui**
- **Redux Toolkit**
- **react-hook-form + zod**
- **lucide-react**
- **react-hot-toast**
- **sweetalert**
- **axios**

Fully responsive across all screen sizes.

---

## 📁 Project Structure

Root Level Files
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ index.html
├─ components.json
├─ eslint.config.js
├─ src/
│ ├─ assets/
│ ├─ axios/
│ │ └─ axiosApi.ts
│ ├─ components/
│ ├─ ui/
│ ├─ hooks/
│ ├─ layouts/
│ ├─ lib/
│ ├─ pages/
│ │ ├─ HomePage.tsx
│ │ ├─ AllProducts.tsx
│ │ ├─ ProductDetails.tsx
│ │ ├─ CartPage.tsx
│ │ ├─ Checkout.tsx
│ │ ├─ CategoryPage.tsx
│ │ └─ ...
│ ├─ admin/
│ ├─ auth/
│ ├─ profile/
│ ├─ routes/
│ ├─ store/
│ └─ types/
└─ public/

yaml
Copy code

---

## 🔌 Backend Integration

Developed in collaboration with **Hager Gamal**, who built the backend API.

- Authentication  
- Products  
- Cart  
- Profile  
- Admin features  

Some sections (orders, wishlist, customers) currently use static data and will be connected to dynamic endpoints in phase 2.

---

## 🧪 Features Not Yet Activated

- Visa payment (function ready but disabled in training mode)  
- Dynamic Wishlist  
- Dynamic Orders  
- Full Admin Analytics  
- Multiple admin roles (will be added in phase 2)

---

## 🛠️ Running the Project Locally

### 1. Clone the repository
```bash
git clone <repo-url>
cd <repo-folder>
2. Install dependencies
bash
Copy code
npm install
# or
pnpm install
3. Add environment variables
Create a .env file:

ini
Copy code
VITE_API_BASE_URL=your_api_url
(Add payment keys later when activating payment.)

4. Start development server
bash
Copy code
npm run dev
5. Build for production
bash
Copy code
npm run build
🚀 Future Enhancements (Phase 2)
Activate real online payment

Dynamic wishlist & order history

Advanced admin analytics

Role-based admin access

Performance optimization and caching

Unit tests & integration tests

👥 Contributors
Anas Wael — Front-end Developer

Hager Gamal — Back-end Developer

📬 Contact
Email: your-email@example.com

GitHub: https://github.com/anaswail

📄 License
This project is for training and educational purposes.
Can be published under MIT or any license you prefer.

yaml
Copy code

