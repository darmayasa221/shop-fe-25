// src/components/layout/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useCart } from "../../contexts/CartContext";
import MiniCart from "../cart/MiniCart";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "motion/react";

const Header = () => {
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Monitor scroll position and update header style
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Animation variants
  const headerVariants: Variants = {
    visible: {
      backgroundColor: isScrolled
        ? "rgba(255, 255, 255, 1)"
        : "rgba(255, 255, 255, 0.9)",
      boxShadow: isScrolled
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        : "none",
    },
    hidden: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "none",
    },
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
  };

  const socialVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  // Decorative circle variants for mobile menu background
  const circleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 0.07 - i * 0.01, // Slightly different opacity for each circle
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
  };

  // Decorative patterns that will animate in the mobile menu background
  const decorativePatterns = [
    { size: 30, top: "10%", left: "85%", delay: 0.1 },
    { size: 20, top: "20%", left: "10%", delay: 0.2 },
    { size: 15, top: "75%", left: "80%", delay: 0.3 },
    { size: 25, top: "60%", left: "5%", delay: 0.4 },
    { size: 18, top: "30%", left: "50%", delay: 0.5 },
    { size: 22, top: "85%", left: "30%", delay: 0.6 },
  ];

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="z-10 text-2xl font-bold">
              ShopName
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["Home", "About", "Shop", "Blog", "Contact"].map(
                (item, index) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                  const isActive = location.pathname === path;

                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to={path}
                        className={`relative pb-1 hover:text-primary ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {item}
                        {isActive && (
                          <motion.span
                            layoutId="underline"
                            className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                }
              )}
            </ul>
          </nav>

          {/* Cart and Mobile Menu Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              aria-label="Open cart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90 md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-5 w-6">
                <motion.span
                  className="absolute block h-0.5 w-full bg-white"
                  animate={{
                    top: isMobileMenuOpen ? "8px" : "0px",
                    rotate: isMobileMenuOpen ? 45 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.span>
                <motion.span
                  className="absolute top-2 block h-0.5 w-full bg-white"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.span>
                <motion.span
                  className="absolute block h-0.5 w-full bg-white"
                  animate={{
                    top: isMobileMenuOpen ? "8px" : "16px",
                    rotate: isMobileMenuOpen ? -45 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 h-screen w-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Large decorative circles */}
              {[1, 2, 3, 4].map((_, i) => (
                <motion.div
                  key={`circle-${i}`}
                  className="absolute rounded-full bg-primary"
                  style={{
                    width: `${300 + i * 100}px`,
                    height: `${300 + i * 100}px`,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                  }}
                  custom={i}
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              ))}

              {/* Small decorative patterns */}
              {decorativePatterns.map((pattern, i) => (
                <motion.div
                  key={`pattern-${i}`}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: `${pattern.size}px`,
                    height: `${pattern.size}px`,
                    top: pattern.top,
                    left: pattern.left,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 0.5,
                    transition: {
                      delay: pattern.delay,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                />
              ))}

              {/* Additional geometry elements */}
              <motion.div
                className="absolute right-10 top-1/4 h-16 w-16 rotate-45 border-4 border-primary/10"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: 1,
                  rotate: 45,
                  transition: { delay: 0.3, duration: 0.6 },
                }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="absolute bottom-1/4 left-10 h-20 w-20 rounded-lg border-4 border-primary/10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.4, duration: 0.6 },
                }}
                exit={{ opacity: 0, scale: 0 }}
              />
            </div>

            <div className="container flex h-full flex-col justify-center">
              <nav className="py-8">
                <ul className="flex flex-col space-y-6 text-center">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About", path: "/about" },
                    { name: "Shop", path: "/shop" },
                    { name: "Blog", path: "/blog" },
                    { name: "Contact", path: "/contact" },
                  ].map((item, i) => (
                    <motion.li
                      key={item.name}
                      custom={i}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Link
                        to={item.path}
                        className={`inline-block text-3xl font-medium transition-colors duration-300 ${
                          location.pathname === item.path
                            ? "text-primary"
                            : "text-gray-800 hover:text-primary"
                        }`}
                      >
                        {item.name}
                        {location.pathname === item.path && (
                          <motion.div
                            className="mx-auto mt-2 h-1 w-8 rounded-full bg-primary"
                            layoutId="mobileUnderline"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="flex justify-center space-x-4 pt-8"
                variants={socialVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {[
                  {
                    name: "Facebook",
                    color: "#4267B2",
                    icon: (
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    ),
                  },
                  {
                    name: "Instagram",
                    color: "#E1306C",
                    icon: (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    ),
                  },
                  {
                    name: "Twitter",
                    color: "#1DA1F2",
                    icon: (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    ),
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: social.color,
                      color: "#ffffff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Cart */}
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
};

export default Header;
