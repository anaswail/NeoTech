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

export interface AsyncState<T = any> {
  data: T | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | any | null;
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

export interface CartState {
  items: CartItem[];
}

export interface ProductsState extends AsyncState<Product[]> {
  currentPage?: number;
  totalPages?: number;
  totalProducts?: number;
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

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword {
  newPassword: string;
  message: string;
}

export interface AuthRegisterData {
  user: IRegisterUser | null;
  token: string | null;
  message?: string;
}

export interface AuthLoginData {
  user: any | null;
  token: string | null;
}

export interface RefreshTokenState extends AsyncState<any> {
  lastRefreshed?: number | null;
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
   � Admin Dashboard Analysis
================================= */
export interface AnalysisStats {
  totalSales: number;
  totalOrders: number;
  newCustomers: number;
}

export interface TopSellingProduct {
  name: string;
  price: number;
  ordersCount: number;
  subTotal: number;
  productId: string;
}

export interface LatestOrder {
  orderId: string;
  product: string;
  orderDate: string;
  price: number;
  payment: "completed" | "pending" | "failed" | string;
  status: "pending" | "completed" | "cancelled" | string;
  customer: string;
}

export interface AnalysisData {
  stats: AnalysisStats;
  topSellingProducts: TopSellingProduct[];
  latestOrders: LatestOrder[];
}

export interface AnalysisResponse {
  success?: boolean;
  message?: string;
  data: AnalysisData;
  statusCode?: number;
}

/* ===============================
   🧾 Get Orders Response
================================= */
export interface ShippingAddress {
  name: string;
  companyName: string;
  streetAddress: string;
  city: string;
  phoneNumber: string;
  email: string;
}

export interface ProductSnapshot {
  title: string;
  images: string[];
  category: string;
}

export interface OrderItem {
  productId: string;
  variationSku: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  productSnapshot: ProductSnapshot;
}

export interface Order {
  _id: string;
  userId: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shipmentStatus: string;
  subtotal: number;
  itemsDiscount: number;
  shippingCost: number;
  taxAmount: number;
  couponDiscount: number;
  totalAmount: number;
  totalItems: number;
  currency: string;
  trackingHistory: any[];
  transactionId: string;
  paymentUrl: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  isCancellable: boolean;
  isEditable: boolean;
}

export type GetOrdersPagination = Pagination;

export interface GetOrdersData {
  orders: Order[];
  pagination: Pagination;
}

export interface GetOrdersResponse {
  success: boolean;
  message: string;
  data: GetOrdersData;
  statusCode: number;
}

/* =============================== 
   📊 Order Status Types
================================= */
export interface IOrderStatus {
  status:
    | "confirmed"
    | "processing"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "refunded";
}

export interface IShipmentStatus {
  status:
    | "pending"
    | "shipped"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "delayed"
    | "returned";
}

export interface IPaymentStatus {
  status:
    | "pending"
    | "completed"
    | "failed"
    | "refunded"
    | "partially_refunded";
}

/* ===============================
    👥 Admin Users
================================= */
export type IPagination = Pagination;

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  avatar: {
    secure_url: string | null;
    public_id: string | null;
  };
  address: string;
  provider: string;
  providerId: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Profile = IUser;

export interface IUserData {
  users: IUser[];
  pagination: IPagination;
}

/* ===============================
   �💳 Card Props (Reusable UI)
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

export interface BanUserData {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export type BanUserState = AsyncState<BanUserData | string>;

/* ===============================
    🛒 Create Order Type
================================= */
export interface ICreateOrder {
  items:
    | {
        productId: string;
        variationSku: string;
        quantity: string;
      }[]
    | null;
  shippingAddress: {
    name: string | null;
    companyName: string | null;
    streetAddress: string | null;
    city: string | null;
    phoneNumber: string | null;
    email: string | null;
  };
  paymentMethod:
    | "credit_card"
    | "paypal"
    | "bank_transfer"
    | "cash_on_delivery";
  shippingCost: number | null;
}
