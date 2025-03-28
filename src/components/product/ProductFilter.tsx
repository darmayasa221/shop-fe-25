import { useState, useEffect } from "react";
import { ProductCategory, SortOption } from "../../types/product";
import { getCategories } from "../../services/productService";

export type FilterParams = {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
  sortBy?: SortOption;
};

type ProductFilterProps = {
  filters: FilterParams;
  onFilterChange: (newFilters: FilterParams) => void;
};

const ProductFilter = ({ filters, onFilterChange }: ProductFilterProps) => {
  const [categories, setCategories] = useState<
    { category: ProductCategory; count: number }[]
  >([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const categoryData = await getCategories();
      setCategories(categoryData);
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (category: ProductCategory | undefined) => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleInStockChange = (checked: boolean) => {
    onFilterChange({ ...filters, inStock: checked ? true : undefined });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFilterChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-500 hover:text-primary"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {expanded && (
        <>
          {/* Categories */}
          <div className="mb-6">
            <h4 className="mb-2 font-medium">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="category-all"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleCategoryChange(undefined)}
                  className="h-4 w-4 text-primary"
                />
                <label htmlFor="category-all" className="ml-2 text-sm">
                  All
                </label>
              </div>

              {categories.map(({ category, count }) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-primary"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-sm"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)} (
                    {count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="mb-2 font-medium">Price Range</h4>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handlePriceChange(
                    e.target.value ? Number(e.target.value) : undefined,
                    filters.maxPrice
                  )
                }
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
              <span className="flex items-center text-gray-500">-</span>
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handlePriceChange(
                    filters.minPrice,
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* In Stock */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in-stock"
                checked={filters.inStock || false}
                onChange={(e) => handleInStockChange(e.target.checked)}
                className="h-4 w-4 text-primary"
              />
              <label htmlFor="in-stock" className="ml-2 text-sm">
                In Stock Only
              </label>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h4 className="mb-2 font-medium">Sort By</h4>
            <select
              value={filters.sortBy || ""}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
            >
              <option value="">Default</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </>
      )}
    </div>
  );
};

export default ProductFilter;
