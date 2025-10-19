export interface cardProps {
  id: string;
  img: string;
  title: string;
  price: number;
  discount?: number;
  deleteIcon?: boolean;
  wishAndCart?: boolean;
}

export interface productsType {
  id: number;
  img: string[];
  title: string;
  price: number;
  discount: number;
  description: string[];
  category: string;
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

/* ✅ flashSales section */
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

/* ✅ products for bestSelling, newArrivals, etc. */
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
