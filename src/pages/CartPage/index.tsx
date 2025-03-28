import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../../components/common/PageTransition";
import useCart from "../../hooks/useCart";
import { getProductById } from "../../data/products";

const CartPage: React.FC = () => {
  const { cartState, updateQuantity, removeFromCart, applyDiscountCode } =
    useCart();
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState(false);

  const handleQuantityChange = (
    productId: string,
    delta: number,
    currentQty: number
  ) => {
    const newQty = currentQty + delta;
    if (newQty > 0) {
      updateQuantity(productId, newQty);
    } else {
      removeFromCart(productId);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim() === "") return;

    const success = applyDiscountCode(discountCode.trim().toUpperCase());
    if (!success) {
      setDiscountError(true);
      setTimeout(() => setDiscountError(false), 3000);
    } else {
      setDiscountError(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartState.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-12 text-center shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/shop"
                className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
              >
                Start Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <h2 className="font-medium">Product</h2>
                    </div>
                    <div className="col-span-2 text-center">
                      <h2 className="font-medium">Price</h2>
                    </div>
                    <div className="col-span-2 text-center">
                      <h2 className="font-medium">Quantity</h2>
                    </div>
                    <div className="col-span-2 text-right">
                      <h2 className="font-medium">Total</h2>
                    </div>
                  </div>
                </div>

                <ul>
                  <AnimatePresence initial={false}>
                    {cartState.items.map((item) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;

                      const price = product.discountedPrice || product.price;
                      const totalPrice = price * item.quantity;

                      return (
                        <motion.li
                          key={item.productId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b last:border-b-0"
                        >
                          <div className="px-6 py-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                              <div className="col-span-6">
                                <div className="flex items-center">
                                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <Link
                                      to={`/products/${product.id}`}
                                      className="font-medium hover:text-gray-800 transition"
                                    >
                                      {product.name}
                                    </Link>
                                    {item.color && (
                                      <p className="text-sm text-gray-500">
                                        Color: {item.color}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2 text-center">
                                <span>${price.toFixed(2)}</span>
                              </div>

                              <div className="col-span-2">
                                <div className="flex items-center justify-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        -1,
                                        item.quantity
                                      )
                                    }
                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
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
                                  <span className="mx-3">{item.quantity}</span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.productId,
                                        1,
                                        item.quantity
                                      )
                                    }
                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
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

                              <div className="col-span-2 text-right font-medium">
                                <div className="flex flex-col items-end">
                                  <span>${totalPrice.toFixed(2)}</span>
                                  <button
                                    onClick={() =>
                                      removeFromCart(item.productId)
                                    }
                                    className="text-sm text-red-500 hover:text-red-700 transition mt-1"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </div>

              <div className="flex justify-between mt-6">
                <Link
                  to="/shop"
                  className="flex items-center text-gray-600 hover:text-black transition"
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartState.subtotal.toFixed(2)}</span>
                  </div>

                  {cartState.discountAmount > 0 && (
                    <div className="flex justify-between mb-3 text-green-600">
                      <span>Discount</span>
                      <span>-${cartState.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-medium text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>${cartState.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Discount Code Form */}
                <div className="mb-6">
                  <label
                    htmlFor="discountCode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Discount Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="discountCode"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountError(false);
                      }}
                      placeholder="Enter code"
                      className="flex-1 rounded-l border-r-0 px-3 py-2 border focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button
                      onClick={handleApplyDiscount}
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CartPage;
