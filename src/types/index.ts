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

export interface productsType {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
  statusCode?: number;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description?: string;
  images?: ProductImage[];
  discount?: Discount;
  category?: Category;
  totalStock?: number;
  originalMinPrice?: number;
  minPrice: number;
  maxPrice: number;
  interfaceImages: ProductImage;
  ratings: Ratings;
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
  _id: string;
  name: string;
  slug: string;
}

export interface Ratings {
  average: number;
  count: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

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

export interface CartItem {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

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

// Updated interface to match backend response structure
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

export interface Category {
  id: string;
  _id: string;
  name: string;
  slug: string;
  icon: string;
}

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
  ratings: {
    average: number;
    count: number;
  };
  _id: string;
  title: string;
  slug: string;
  discount?: Discount; // optional لأن مش كل المنتجات فيها خصم
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  totalStock: number;
  originalMinPrice: number;
  minPrice: number;
  maxPrice: number;
  interfaceImages: {
    secure_url: string;
    public_id: string;
  };
  id: string;
}

export interface Discount {
  value: number;
  maxDiscountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
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

/* flashSales section */
export interface FlashSales {
  products: FlashSalesProduct[];
  count: number;
  countdown: string | null;
}

export interface FlashSalesProduct {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description?: string;
  images: {
    secure_url: string;
    public_id: string;
  }[];
  discount?: Discount;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  ratings: {
    average: number;
    count: number;
  };
}

/* products for bestSelling, newArrivals, etc. */
export interface Product {
  id: string;
  _id: string;
  title: string;
  slug: string;
  minPrice: number;
  maxPrice: number;
  interfaceImages: {
    secure_url: string;
    public_id: string;
  };
  ratings: {
    average: number;
    count: number;
  };
  discount?: Discount;
}

export interface Discount {
  value: number;
  maxDiscountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
