import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import PageTransition from "../../components/common/PageTransition";

const NotFoundPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-black">404</h1>
            <div className="h-1 w-16 bg-black mx-auto my-6"></div>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/"
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
              >
                Return Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
