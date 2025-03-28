import React, { useState } from "react";
import { Link, Routes, Route } from "react-router";
import { motion } from "motion/react";
import PageTransition from "../../components/common/PageTransition";
import { blogPosts } from "../../data/blog-posts";
import BlogPostDetail from "./BlogPostDetail";

const BlogListing: React.FC = () => {
  const [category, setCategory] = useState<string | null>(null);

  // Filter posts by category if selected
  const filteredPosts = category
    ? blogPosts.filter((post) => post.category === category)
    : blogPosts;

  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Fishing Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, techniques, and stories from our fishing community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <button
            onClick={() => setCategory(null)}
            className={`m-1 px-4 py-2 rounded-full text-sm font-medium ${
              category === null
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            } transition`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`m-1 px-4 py-2 rounded-full text-sm font-medium ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border"
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 hover:text-gray-700 transition">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>
                    <span className="text-black font-medium hover:underline">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const BlogPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogListing />} />
      <Route path="/:postId" element={<BlogPostDetail />} />
    </Routes>
  );
};

export default BlogPage;
