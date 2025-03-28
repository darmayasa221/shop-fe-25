import { Product } from "../types/product.types";

export const products: Product[] = [
  {
    id: "1",
    name: "TroutMaster Spinner",
    price: 14.99,
    discountedPrice: 12.99,
    description:
      "The TroutMaster Spinner is designed to attract trout with its realistic spinning action. Made from high-quality materials, this bait is durable and effective in both freshwater and saltwater environments.",
    shortDescription: "Premium spinner bait for trout fishing",
    images: Array.from(
      { length: 36 },
      (_, i) => `https://picsum.photos/id/${26 + i}/800/800` // Simulating 36 frames
    ),
    category: "spinners",
    tags: ["trout", "spinner", "freshwater", "saltwater"],
    inStock: true,
    specifications: {
      size: "Medium",
      color: ["Silver", "Gold", "Rainbow"],
      type: "Spinner",
      recommendedFish: ["Trout", "Bass", "Pike"],
      material: "Metal & Feather",
      weight: "7g",
      dimensions: "5cm x 2cm",
    },
    relatedProducts: ["2", "3"],
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "BassPro Worm Set",
    price: 9.99,
    description:
      "The BassPro Worm Set includes 10 realistic soft plastic worms in various colors and sizes.",
    shortDescription: "Realistic soft plastic worms for bass",
    images: Array.from(
      { length: 36 },
      (_, i) => `https://picsum.photos/id/${36 + i}/800/800` // Simulating 36 frames
    ),
    category: "softBait",
    tags: ["bass", "worm", "freshwater", "set"],
    inStock: true,
    specifications: {
      size: "Various (4-6 inches)",
      color: ["Green", "Brown", "Purple", "Black"],
      type: "Soft Plastic",
      recommendedFish: ["Bass", "Crappie", "Catfish"],
      material: "Soft Plastic",
      weight: "3-4g each",
      dimensions: "10-15cm x 0.5cm",
    },
    relatedProducts: ["1", "3"],
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "MarinePro Jig Kit",
    price: 24.99,
    discountedPrice: 19.99,
    description:
      "The MarinePro Jig Kit contains 5 premium jigs designed for saltwater fishing.",
    shortDescription: "Professional saltwater jig kit",
    images: Array.from(
      { length: 36 },
      (_, i) => `https://picsum.photos/id/${46 + i}/800/800` // Simulating 36 frames
    ),
    category: "jigs",
    tags: ["saltwater", "jig", "kit", "professional"],
    inStock: true,
    specifications: {
      size: "Large",
      color: ["Blue", "White", "Silver", "Yellow", "Red"],
      type: "Jig",
      recommendedFish: ["Tuna", "Mackerel", "Snapper", "Grouper"],
      material: "Metal & Synthetic Hair",
      weight: "15-25g each",
      dimensions: "7-10cm x 3cm",
    },
    relatedProducts: ["1", "2"],
    rating: 4.9,
    reviewCount: 67,
  },
];

// Helper functions remain unchanged
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];

  return product.relatedProducts
    .map((id) => getProductById(id))
    .filter((product): product is Product => product !== undefined);
};
