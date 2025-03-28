import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import ProductView360 from "../../components/common/ProductView360";
import { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [is360View, setIs360View] = useState(true); // State to toggle 360 view
  const hasDiscount = product.discountedPrice !== undefined;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.discountedPrice ?? 0)) / product.price) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {is360View ? (
            <ProductView360
              // images={product.images}
              altText={product.name}
              className="w-full h-full"
              // testMode={true}
            />
          ) : (
            <motion.img
              // src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation on click
                setIs360View(true); // Switch to 360 view
              }}
            />
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          )}

          {hasDiscount && (
            <motion.div
              className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {discountPercentage}% OFF
            </motion.div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2 h-10">
            {product.shortDescription}
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-baseline">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-black">
                    ${(product.discountedPrice ?? 0).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-black">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-3 py-2 bg-black text-white rounded font-medium transition-colors hover:bg-gray-800"
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
