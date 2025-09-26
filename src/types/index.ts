export interface cardProps {
  id: number;
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
  id: number;
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
