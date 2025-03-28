import React, { createContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartState } from "../../types/product.types";
import { getProductById } from "../../data/products";

interface CartContextValue {
  cartState: CartState;
  addToCart: (productId: string, quantity: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscountCode: (code: string) => boolean;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const defaultCartState: CartState = {
  items: [],
  subtotal: 0,
  discountAmount: 0,
  total: 0,
};

export const CartContext = createContext<CartContextValue>({
  cartState: defaultCartState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  applyDiscountCode: () => false,
  isCartOpen: false,
  toggleCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

// Valid discount codes and their percentage values
const DISCOUNT_CODES: Record<string, number> = {
  WELCOME10: 10,
  SUMMER25: 25,
  FISHON15: 15,
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartState, setCartState] = useState<CartState>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : defaultCartState;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  // Recalculate totals whenever items or discount changes
  useEffect(() => {
    calculateTotals();
  }, [cartState.items, cartState.discountCode]);

  const calculateTotals = useCallback(() => {
    let subtotal = 0;

    cartState.items.forEach((item) => {
      const product = getProductById(item.productId);
      if (product) {
        const price = product.discountedPrice || product.price;
        subtotal += price * item.quantity;
      }
    });

    // Apply discount if code exists
    let discountAmount = 0;
    if (cartState.discountCode && DISCOUNT_CODES[cartState.discountCode]) {
      discountAmount =
        subtotal * (DISCOUNT_CODES[cartState.discountCode] / 100);
    }

    const total = subtotal - discountAmount;

    setCartState((prev) => ({
      ...prev,
      subtotal,
      discountAmount,
      total,
    }));
  }, [cartState.items, cartState.discountCode]);

  const addToCart = useCallback(
    (productId: string, quantity: number, color?: string) => {
      const product = getProductById(productId);
      if (!product || !product.inStock) return;

      setCartState((prev) => {
        // Check if item already exists in cart
        const existingItemIndex = prev.items.findIndex(
          (item) => item.productId === productId && item.color === color
        );

        let newItems;

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = [...prev.items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // Add new item
          newItems = [...prev.items, { productId, quantity, color }];
        }

        return {
          ...prev,
          items: newItems,
        };
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartState((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartState(defaultCartState);
  }, []);

  const applyDiscountCode = useCallback((code: string): boolean => {
    if (DISCOUNT_CODES[code]) {
      setCartState((prev) => ({
        ...prev,
        discountCode: code,
      }));
      return true;
    }
    return false;
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyDiscountCode,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}

      {/* Animated Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleCart}
            />

            {/* Cart Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button
                    onClick={toggleCart}
                    className="p-1 rounded-full hover:bg-gray-100"
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

                <div className="flex-grow overflow-y-auto p-4">
                  {cartState.items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <svg
                        className="w-16 h-16 mb-4"
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
                      <p className="text-lg">Your cart is empty</p>
                      <button
                        onClick={toggleCart}
                        className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      <AnimatePresence initial={false}>
                        {cartState.items.map((item) => {
                          const product = getProductById(item.productId);
                          if (!product) return null;

                          return (
                            <motion.li
                              key={`${item.productId}-${
                                item.color || "default"
                              }`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                              }}
                              className="flex items-center p-2 border rounded-lg"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />

                              <div className="ml-4 flex-grow">
                                <h3 className="text-sm font-medium">
                                  {product.name}
                                </h3>
                                {item.color && (
                                  <p className="text-xs text-gray-500">
                                    Color: {item.color}
                                  </p>
                                )}
                                <div className="flex items-center mt-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.quantity - 1
                                      )
                                    }
                                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2 text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.productId,
                                        item.quantity + 1
                                      )
                                    }
                                    className="w-6 h-6 rounded-full border flex items-center justify-center"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="font-medium">
                                  $
                                  {(
                                    (product.discountedPrice || product.price) *
                                    item.quantity
                                  ).toFixed(2)}
                                </p>
                                <button
                                  onClick={() => removeFromCart(item.productId)}
                                  className="text-xs text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </motion.li>
                          );
                        })}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {cartState.items.length > 0 && (
                  <motion.div
                    className="p-4 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartState.subtotal.toFixed(2)}</span>
                      </div>

                      {cartState.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${cartState.discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>${cartState.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
                      onClick={() => {
                        toggleCart();
                        // Navigate to checkout (implement this)
                      }}
                    >
                      Checkout
                    </motion.button>

                    <button
                      className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

export default CartProvider;
