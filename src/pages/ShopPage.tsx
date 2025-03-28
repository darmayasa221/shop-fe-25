import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Product, ProductCategory, SortOption } from "../types/product";
import { filterProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard";
import ProductFilter, {
  FilterParams,
} from "../components/product/ProductFilter";
import ProductSearch from "../components/product/ProductSearch";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterParams>({});

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category") as ProductCategory | null;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const searchTerm = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") as SortOption | null;

    const newFilters: FilterParams = {};

    if (category) newFilters.category = category;
    if (minPrice) newFilters.minPrice = Number(minPrice);
    if (maxPrice) newFilters.maxPrice = Number(maxPrice);
    if (inStock === "true") newFilters.inStock = true;
    if (searchTerm) newFilters.searchTerm = searchTerm;
    if (sortBy) newFilters.sortBy = sortBy;

    setFilters(newFilters);
  }, [searchParams]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filteredProducts = await filterProducts(
          filters.category,
          filters.minPrice,
          filters.maxPrice,
          filters.inStock,
          filters.searchTerm,
          filters.sortBy
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Update URL params when filters change
  const handleFilterChange = (newFilters: FilterParams) => {
    const params = new URLSearchParams();

    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.minPrice)
      params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice)
      params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.inStock) params.set("inStock", "true");
    if (newFilters.searchTerm) params.set("search", newFilters.searchTerm);
    if (newFilters.sortBy) params.set("sortBy", newFilters.sortBy);

    setSearchParams(params);
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ ...filters, searchTerm: searchTerm || undefined });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>

      <div className="mb-6">
        <ProductSearch
          initialValue={filters.searchTerm || ""}
          onSearch={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters */}
        <div className="lg:col-span-1">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mb-4 h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-2 text-lg font-medium">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term to find what you're
                looking for.
              </p>
              <button
                onClick={() => handleFilterChange({})}
                className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-600">
                Showing {products.length} products
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
