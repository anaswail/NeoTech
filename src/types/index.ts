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
