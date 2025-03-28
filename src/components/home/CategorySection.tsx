import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getCategories } from "../../services/productService";
import { ProductCategory } from "../../types/product";

type CategoryCard = {
  category: ProductCategory;
  title: string;
  image: string;
  description: string;
};

const CategorySection = () => {
  const [categories, setCategories] = useState<
    { category: ProductCategory; count: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Predefined category cards with images and descriptions
  const categoryCards: CategoryCard[] = [
    {
      category: "clothing",
      title: "Clothing",
      image: "/images/categories/clothing.jpg",
      description: "Comfortable and stylish apparel for everyday wear",
    },
    {
      category: "electronics",
      title: "Electronics",
      image: "/images/categories/electronics.jpg",
      description: "Cutting-edge devices and gadgets for modern living",
    },
    {
      category: "home",
      title: "Home & Kitchen",
      image: "/images/categories/home.jpg",
      description: "Essential items to enhance your living space",
    },
    {
      category: "beauty",
      title: "Beauty",
      image: "/images/categories/beauty.jpg",
      description: "Premium skincare and beauty products",
    },
    {
      category: "books",
      title: "Books",
      image: "/images/categories/books.jpg",
      description: "Best-selling titles and literary classics",
    },
    {
      category: "toys",
      title: "Toys",
      image: "/images/categories/toys.jpg",
      description: "Fun and educational toys for all ages",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Browse our wide selection of products across different categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-video w-full animate-pulse bg-gray-200"></div>
                <div className="p-4">
                  <div className="mb-2 h-6 w-1/2 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {categoryCards.map((card) => {
              const count =
                categories.find((c) => c.category === card.category)?.count ||
                0;

              return (
                <Link
                  key={card.category}
                  to={`/shop?category=${card.category}`}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/80">{count} products</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
