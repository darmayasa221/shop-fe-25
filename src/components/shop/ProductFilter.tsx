import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ProductFilterOptions } from "../../types/product.types";
import { products } from "../../data/products";

interface ProductFilterProps {
  options: ProductFilterOptions;
  onChange: (options: ProductFilterOptions) => void;
  onClose?: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  options,
  onChange,
  onClose,
}) => {
  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Extract unique fish types
  const fishTypes = [
    ...new Set(
      products.flatMap((product) => product.specifications.recommendedFish)
    ),
  ];

  // Extract min and max prices
  const prices = products.map(
    (product) => product.discountedPrice || product.price
  );
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  // State for price range slider
  const [priceRange, setPriceRange] = useState<[number, number]>(
    options.priceRange || [minPrice, maxPrice]
  );

  // Update local state when props change
  useEffect(() => {
    if (options.priceRange) {
      setPriceRange(options.priceRange);
    } else {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [options.priceRange, minPrice, maxPrice]);

  const handleCategoryChange = (category: string) => {
    onChange({
      ...options,
      category: options.category === category ? undefined : category,
    });
  };

  const handleFishTypeChange = (fish: string) => {
    onChange({
      ...options,
      recommendedFish: options.recommendedFish === fish ? undefined : fish,
    });
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...options,
      inStock: e.target.checked ? true : undefined,
    });
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newRange = [...priceRange] as [number, number];
    if (type === "min") {
      newRange[0] = value > newRange[1] ? newRange[1] : value;
    } else {
      newRange[1] = value < newRange[0] ? newRange[0] : value;
    }
    setPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onChange({ ...options, priceRange });
  };

  const clearAllFilters = () => {
    onChange({});
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black"
                />
                <span className="ml-2 capitalize">
                  {category === "softBait" ? "Soft Bait" : category}
                </span>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <label className="text-sm text-gray-600">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange("min", Number(e.target.value))
                }
                className="w-24 border rounded px-2 py-1 mt-1"
                min={minPrice}
                max={maxPrice}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange("max", Number(e.target.value))
                }
                className="w-24 border rounded px-2 py-1 mt-1"
                min={minPrice}
                max={maxPrice}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={applyPriceRange}
            className="w-full py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition"
          >
            Apply Price
          </motion.button>
        </div>
      </div>

      {/* Recommended Fish Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3">Fish Type</h3>
        <div className="space-y-2">
          {fishTypes.map((fish) => (
            <motion.div
              key={fish}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.recommendedFish === fish}
                  onChange={() => handleFishTypeChange(fish)}
                  className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black"
                />
                <span className="ml-2">{fish}</span>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In Stock Filter */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.inStock === true}
            onChange={handleInStockChange}
            className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-black"
          />
          <span className="ml-2 font-medium">In Stock Only</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      <div className="pt-4 border-t">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearAllFilters}
          className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Clear All Filters
        </motion.button>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-2 mt-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Apply & Close
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
