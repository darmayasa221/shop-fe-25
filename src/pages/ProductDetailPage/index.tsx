import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import PageTransition from "../../components/common/PageTransition";
import ProductView360 from "../../components/common/ProductView360";
import { getProductById, getRelatedProducts } from "../../data/products";
import useCart from "../../hooks/useCart";
import ProductCard from "../../components/shop/ProductCard";
import { Product } from "../../types/product.types";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState(false);

  // Valid discount codes (should be moved to a service in a real app)
  const validDiscountCodes = ["WELCOME10", "SUMMER25", "FISHON15"];

  useEffect(() => {
    if (!productId) {
      navigate("/shop");
      return;
    }

    const fetchedProduct = getProductById(productId);
    if (!fetchedProduct) {
      navigate("/shop");
      return;
    }

    setProduct(fetchedProduct);

    // Set first color as default if colors exist
    if (fetchedProduct.specifications.color.length > 0) {
      setSelectedColor(fetchedProduct.specifications.color[0]);
    }

    // Fetch related products
    const related = getRelatedProducts(productId);
    setRelatedProducts(related);
  }, [productId, navigate]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product.id, quantity, selectedColor || undefined);

      // Show success toast notification
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const applyDiscount = () => {
    if (validDiscountCodes.includes(discountCode)) {
      setDiscountApplied(true);
      setDiscountError(false);
      toast.success("Discount code applied successfully!", {
        position: "bottom-right",
      });
    } else {
      setDiscountApplied(false);
      setDiscountError(true);
      toast.error("Invalid discount code", {
        position: "bottom-right",
      });
    }
  };

  // Calculate final price with discount
  const basePrice = product.discountedPrice || product.price;
  let finalPrice = basePrice;

  if (discountApplied) {
    // Apply additional 10% discount if code is valid
    // In a real app, discount percentage would vary based on the code
    finalPrice = basePrice * 0.9;
  }

  return (
    <PageTransition className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center text-gray-600 hover:text-black transition mb-4"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images with 360 View */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <ProductView360
              // images={product.images}
              altText={product.name}
              className="aspect-square w-full"
            />
          </div>

          {/* Product Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-6">
                {product.discountedPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-black mr-2">
                      ${product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-black text-white text-xs font-bold rounded">
                      {Math.round(
                        ((product.price - product.discountedPrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-black">
                    ${product.price.toFixed(2)}
                  </span>
                )}

                {/* Discount code section */}
                {discountApplied && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-green-600 font-medium"
                  >
                    Additional discount applied: ${finalPrice.toFixed(2)}
                  </motion.div>
                )}
              </div>

              <div className="prose prose-sm text-gray-700 mb-6">
                <p>{product.description}</p>
              </div>

              {/* Color Selection */}
              {product.specifications.color.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {product.specifications.color.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`
                          w-10 h-10 rounded-full border-2 flex items-center justify-center
                          ${
                            selectedColor === color
                              ? "border-black"
                              : "border-transparent"
                          }
                        `}
                        aria-label={`Select ${color} color`}
                      >
                        <span
                          className="w-8 h-8 rounded-full border bg-gray-200"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w teht-10 h-10 rounded-full border flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">
                  Discount Code
                </h3>
                <div className="flex">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase());
                      setDiscountError(false);
                    }}
                    placeholder="Enter code"
                    className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-black text-white rounded-r hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                </div>
                <AnimatePresence>
                  {discountError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      Invalid discount code
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="text-xs text-gray-500 mt-1">
                  Try: WELCOME10, SUMMER25, FISHON15
                </p>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`
                  w-full py-3 px-6 rounded-lg text-white font-medium text-lg mb-4
                  ${
                    product.inStock
                      ? "bg-black hover:bg-gray-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                  transition-colors
                `}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              {/* Product Specifications */}
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Size</p>
                    <p className="font-medium">{product.specifications.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Type</p>
                    <p className="font-medium">{product.specifications.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Material</p>
                    <p className="font-medium">
                      {product.specifications.material}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Weight</p>
                    <p className="font-medium">
                      {product.specifications.weight}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Dimensions</p>
                    <p className="font-medium">
                      {product.specifications.dimensions}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Recommended Fish</p>
                    <p className="font-medium">
                      {product.specifications.recommendedFish.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default ProductDetailPage;
