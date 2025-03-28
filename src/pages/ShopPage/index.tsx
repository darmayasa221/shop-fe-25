import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../../data/products";
import { Product, ProductFilterOptions } from "../../types/product.types";
import ProductCard from "../../components/shop/ProductCard";
import PageTransition from "../../components/common/PageTransition";
import ProductFilter from "../../components/shop/ProductFilter";
import { useSearchParams } from "react-router";

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterOptions, setFilterOptions] = useState<ProductFilterOptions>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract filter values from URL params on initial load
  useEffect(() => {
    const category = searchParams.get("category") || undefined;
    const sortBy =
      (searchParams.get("sort") as ProductFilterOptions["sortBy"]) || undefined;
    const inStock = searchParams.get("inStock") === "true" ? true : undefined;
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;
    const fish = searchParams.get("fish") || undefined;

    const priceRange =
      minPrice && maxPrice
        ? ([minPrice, maxPrice] as [number, number])
        : undefined;

    setFilterOptions({
      category,
      sortBy,
      inStock,
      priceRange,
      recommendedFish: fish,
    });
  }, [searchParams]);

  // Apply filters when options change
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (filterOptions.category) {
      result = result.filter(
        (product) => product.category === filterOptions.category
      );
    }

    // Filter by in-stock status
    if (filterOptions.inStock !== undefined) {
      result = result.filter(
        (product) => product.inStock === filterOptions.inStock
      );
    }

    // Filter by price range
    if (filterOptions.priceRange) {
      const [min, max] = filterOptions.priceRange;
      result = result.filter((product) => {
        const price = product.discountedPrice || product.price;
        return price >= min && price <= max;
      });
    }

    // Filter by recommended fish
    if (filterOptions.recommendedFish) {
      result = result.filter((product) =>
        product.specifications.recommendedFish.some(
          (fish) =>
            fish.toLowerCase() === filterOptions.recommendedFish?.toLowerCase()
        )
      );
    }

    // Apply sorting
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case "price-asc":
          result.sort((a, b) => {
            const priceA = a.discountedPrice || a.price;
            const priceB = b.discountedPrice || b.price;
            return priceA - priceB;
          });
          break;
        case "price-desc":
          result.sort((a, b) => {
            const priceA = a.discountedPrice || a.price;
            const priceB = b.discountedPrice || b.price;
            return priceB - priceA;
          });
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);

    // Update URL with filter params
    const params = new URLSearchParams();
    if (filterOptions.category) params.set("category", filterOptions.category);
    if (filterOptions.sortBy) params.set("sort", filterOptions.sortBy);
    if (filterOptions.inStock !== undefined)
      params.set("inStock", String(filterOptions.inStock));
    if (filterOptions.priceRange) {
      params.set("minPrice", String(filterOptions.priceRange[0]));
      params.set("maxPrice", String(filterOptions.priceRange[1]));
    }
    if (filterOptions.recommendedFish)
      params.set("fish", filterOptions.recommendedFish);

    setSearchParams(params);
  }, [filterOptions, setSearchParams]);

  const handleFilterChange = (newOptions: ProductFilterOptions) => {
    setFilterOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <PageTransition className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Shop Fishing Bait
        </h1>
        <p className="text-gray-600 mt-2 text-center md:text-left">
          Browse our selection of premium fishing bait for the perfect catch
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleFilter}
            className="w-full py-2 px-4 bg-black text-white rounded-lg flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Sidebar - Desktop always visible, Mobile conditionally */}
        <AnimatePresence>
          {(isFilterOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`lg:w-1/4 bg-white p-4 rounded-lg border ${
                window.innerWidth >= 1024
                  ? ""
                  : "fixed inset-0 z-50 overflow-auto"
              }`}
            >
              {window.innerWidth < 1024 && (
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={toggleFilter}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <ProductFilter
                options={filterOptions}
                onChange={handleFilterChange}
                onClose={window.innerWidth < 1024 ? toggleFilter : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-2 sm:mb-0">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>

            <select
              value={filterOptions.sortBy || ""}
              onChange={(e) =>
                handleFilterChange({
                  sortBy: e.target.value as ProductFilterOptions["sortBy"],
                })
              }
              className="bg-white border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-lg p-8 text-center"
            >
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={() => setFilterOptions({})}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ShopPage;
