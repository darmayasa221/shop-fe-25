import { useRef, useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../../contexts/CartContext";
import { motion, AnimatePresence, Variants } from "motion/react";

type MiniCartProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const cartVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            ref={cartRef}
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl sm:w-96"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                Your Cart ({cartItems.length})
              </h2>
              <motion.button
                onClick={onClose}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            {cartItems.length === 0 ? (
              <motion.div
                className="py-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </motion.div>
                <p className="mb-4 text-gray-600">Your cart is empty</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item, i) => (
                      <motion.div
                        key={item.product.id}
                        className="flex items-start border-b border-gray-200 pb-4"
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{
                          opacity: 0,
                          x: -20,
                          transition: { duration: 0.2 },
                        }}
                        layout
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={onClose}
                          >
                            <motion.img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </Link>
                        </div>

                        <div className="ml-4 flex-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={onClose}
                            className="text-sm font-medium hover:text-primary"
                          >
                            {item.product.name}
                          </Link>

                          <div className="mt-1 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <span>
                                {item.quantity} × $
                                {(
                                  item.product.salePrice ?? item.product.price
                                ).toFixed(2)}
                              </span>
                            </div>

                            <motion.button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="mb-6 border-t border-gray-200 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <motion.span
                      key={getCartTotal()} // Re-animate when total changes
                      initial={{ scale: 1.1, color: "var(--color-primary)" }}
                      animate={{ scale: 1, color: "#000000" }}
                      transition={{ duration: 0.3 }}
                    >
                      ${getCartTotal().toFixed(2)}
                    </motion.span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Shipping and taxes calculated at checkout
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="block w-full rounded border border-gray-300 px-4 py-2 text-center text-sm font-medium hover:bg-gray-50"
                    >
                      View Cart
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="block w-full rounded bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary/90"
                    >
                      Checkout
                    </Link>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniCart;
