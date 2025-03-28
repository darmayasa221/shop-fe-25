export type ProductCategory =
  | "clothing"
  | "electronics"
  | "home"
  | "beauty"
  | "books"
  | "toys";

export type ProductTag = string;

export type ProductReview = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: ProductCategory;
  tags: ProductTag[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  reviews: ProductReview[];
  createdAt: Date;
  updatedAt: Date;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";
