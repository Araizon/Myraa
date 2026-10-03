export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  featured?: boolean;
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timestamp: number;
  reply?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: number;
  dateReadable: string;
}

export type PageTab = 'home' | 'shop' | 'reviews' | 'contact';
