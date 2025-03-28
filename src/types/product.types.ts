export interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  specifications: ProductSpecifications;
  relatedProducts?: string[];
  rating: number;
  reviewCount: number;
}

export interface ProductSpecifications {
  size: string;
  color: string[];
  type: string;
  recommendedFish: string[];
  material: string;
  weight: string;
  dimensions: string;
}

export type ProductFilterOptions = {
  category?: string;
  priceRange?: [number, number];
  inStock?: boolean;
  recommendedFish?: string;
  type?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
};

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  total: number;
}
