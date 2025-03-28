import React from "react";
import { Routes, Route } from "react-router";

// Import pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRouter;
