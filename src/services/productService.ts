import { Product, ProductCategory, SortOption } from "../types/product";

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable cotton t-shirt that goes with everything.",
    price: 24.99,
    images: ["/images/products/tshirt-white.jpg"],
    category: "clothing",
    tags: ["t-shirt", "essential", "cotton"],
    inStock: true,
    stockQuantity: 100,
    featured: true,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Jane Doe",
        rating: 4.5,
        comment: "Great quality and fits perfectly!",
        date: new Date("2024-02-15"),
      },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 129.99,
    salePrice: 99.99,
    images: ["/images/products/earbuds.jpg"],
    category: "electronics",
    tags: ["audio", "wireless", "tech"],
    inStock: true,
    stockQuantity: 50,
    featured: true,
    reviews: [
      {
        id: "r2",
        userId: "u2",
        userName: "John Smith",
        rating: 5,
        comment: "Amazing sound quality and battery life!",
        date: new Date("2024-02-20"),
      },
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "Ceramic Coffee Mug",
    description: "Handcrafted ceramic mug for your morning coffee.",
    price: 18.99,
    images: ["/images/products/coffee-mug.jpg"],
    category: "home",
    tags: ["kitchen", "ceramic", "coffee"],
    inStock: true,
    stockQuantity: 75,
    featured: false,
    reviews: [],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    name: "Natural Face Serum",
    description: "Organic face serum for all skin types.",
    price: 34.99,
    images: ["/images/products/face-serum.jpg"],
    category: "beauty",
    tags: ["skincare", "organic", "serum"],
    inStock: true,
    stockQuantity: 30,
    featured: false,
    reviews: [],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    name: "Best-Selling Novel",
    description: "The latest best-selling fiction novel.",
    price: 19.99,
    salePrice: 14.99,
    images: ["/images/products/novel.jpg"],
    category: "books",
    tags: ["fiction", "bestseller", "paperback"],
    inStock: true,
    stockQuantity: 60,
    featured: true,
    reviews: [],
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "6",
    name: "Wooden Building Blocks",
    description: "Educational wooden building blocks for children.",
    price: 29.99,
    images: ["/images/products/blocks.jpg"],
    category: "toys",
    tags: ["educational", "wooden", "kids"],
    inStock: true,
    stockQuantity: 40,
    featured: false,
    reviews: [],
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-01-30"),
  },
];

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
};

// Get a product by ID
export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((product) => product.id === id);
};

// Filter products
export const filterProducts = async (
  category?: ProductCategory,
  minPrice?: number,
  maxPrice?: number,
  inStock?: boolean,
  searchTerm?: string,
  sortBy?: SortOption
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  // Apply price range filter
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => (product.salePrice ?? product.price) >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => (product.salePrice ?? product.price) <= maxPrice
    );
  }

  // Apply in-stock filter
  if (inStock !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.inStock === inStock
    );
  }

  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        filteredProducts.sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
        );
        break;
      case "price-desc":
        filteredProducts.sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
        );
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filteredProducts.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
    }
  }

  return filteredProducts;
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.filter((product) => product.featured);
};

// Get categories with counts
export const getCategories = async (): Promise<
  { category: ProductCategory; count: number }[]
> => {
  // Count products in each category
  const categories: ProductCategory[] = [
    "clothing",
    "electronics",
    "home",
    "beauty",
    "books",
    "toys",
  ];

  return categories.map((category) => ({
    category,
    count: mockProducts.filter((product) => product.category === category)
      .length,
  }));
};
