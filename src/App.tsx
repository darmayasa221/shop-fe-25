import React from "react";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./router";
import AnimatedNavbar from "./components/layout/AnimatedNavbar";
import Footer from "./components/layout/Footer";
import CartProvider from "./contexts/CartContext";
import "./styles/globals.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <AnimatedNavbar />
          <main className="flex-grow">
            <AppRouter />
          </main>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
