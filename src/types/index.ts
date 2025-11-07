/* ===============================
   🛒 Product & Related Types
================================= */

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description?: string;
  images?: ProductImage[];
  interfaceImages: ProductImage;
  discount?: Discount;
  category?: Category;
  totalStock?: number;
  originalMinPrice?: number;
  minPrice: number;
  maxPrice: number;
  ratings: Ratings;
  variations?: Variation[];
}

export interface ProductImage {
  secure_url: string;
  public_id: string;
}

export interface Discount {
  value: number;
  maxDiscountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Category {
  id?: string;
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Ratings {
  average: number;
  count: number;
}

/* ===============================
   📦 Pagination
================================= */
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/* ===============================
   🧾 Variations
================================= */
export interface Variation {
  attributes: {
    color: {
      name: string;
      hex: string;
    };
    storage?: string;
    ram?: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  sku: string;
  price: number;
  stock: number;
  stockAlert: number;
  weight: number;
  status: "in_stock" | "out_of_stock" | "coming_soon";
  isActive: boolean;
}

/* ===============================
   🛍️ Cart
================================= */
export interface CartItem {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

/* ===============================
   👤 Auth
================================= */
export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

/* ===============================
   🏠 Home Data Response
================================= */
export interface HomeDataResponse {
  success: boolean;
  message: string;
  data: HomeData;
  statusCode: number;
}

export interface HomeData {
  categories: Category[];
  flashSales: FlashSales;
  bestSelling: Product[];
  discoverProducts: Product[];
  newArrivals: Product[];
}

/* ===============================
   🏷️ Category Data
================================= */
export interface CategoryResponse {
  data: CategoryData;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

export interface CategoryData {
  products: {
    products: catProduct[];
    pagination: Pagination;
  };
  children: ChildCategory[];
  path: CategoryPath[];
}

export interface catProduct {
  ratings: Ratings;
  _id: string;
  title: string;
  slug: string;
  discount?: Discount;
  category: Category;
  totalStock: number;
  originalMinPrice: number;
  minPrice: number;
  maxPrice: number;
  interfaceImages: ProductImage;
  id: string;
}

export interface ChildCategory {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
}

export interface CategoryPath {
  _id: string;
  name: string;
  slug: string;
  level: number;
}

/* ===============================
   ⚡ Flash Sales Section
================================= */
/* ⚡ Flash Sales Section (Updated) */
export interface FlashSales {
  products: FlashSalesProduct[];
  count: number;
  countdown: string | null;
}

export interface FlashSalesProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  discount?: Discount;
  totalStock: number;
  originalMinPrice: number;
  minPrice: number;
  maxPrice: number;
  interfaceImages: ProductImage;
  ratings: Ratings;
}

/* ===============================
   💳 Card Props (Reusable UI)
================================= */
export interface cardProps {
  id: string;
  img: string;
  title: string;
  price: number;
  discount?: number;
  deleteIcon?: boolean;
  wishAndCart?: boolean;
  deleteAndUpdate?: boolean;
}

/* ===============================
   📦 Products Type for API Response
================================= */
export interface productsType {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
  statusCode?: number;
}

/* ===============================
    🗂️ Category Levels
================================= */
export interface CategoryLevels {
  id: string;
  name: string;
  description: string;
  subCategories?: CategoryLevels[];
}
