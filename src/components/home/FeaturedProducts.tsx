import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getFeaturedProducts } from "../../services/productService";
import { Product } from "../../types/product";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Discover our best-selling and top-rated products that customers
            love.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-square w-full animate-pulse bg-gray-200"></div>
                <div className="p-4">
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/shop"
                className="inline-block rounded-md border border-primary bg-white px-6 py-3 font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
