import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import PageTransition from "../../components/common/PageTransition";
import { getBlogPostById, BlogPost } from "../../data/blog-posts";

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      navigate("/blog");
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const fetchedPost = getBlogPostById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        // Post not found
        navigate("/blog");
      }
      setLoading(false);
    }, 300);
  }, [postId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-6">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-block px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const renderContent = () => {
    return post.content.split("\n").map((paragraph, index) => {
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
            {paragraph.substring(2)}
          </h1>
        );
      } else if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
            {paragraph.substring(3)}
          </h2>
        );
      } else if (paragraph.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-4 mb-2">
            {paragraph.substring(4)}
          </h3>
        );
      } else if (paragraph.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2">
            {paragraph.substring(2)}
          </li>
        );
      } else if (paragraph.trim() === "") {
        return null;
      } else {
        return (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <PageTransition>
      <article className="container mx-auto px-4 py-12">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition"
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
          Back to All Posts
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video w-full overflow-hidden rounded-xl mb-8">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mr-2">
                {post.category}
              </span>
              <span className="text-gray-500">{post.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>

            <div className="flex items-center mb-8">
              <span className="text-gray-700">By {post.author}</span>
            </div>

            <div className="prose prose-lg max-w-none">{renderContent()}</div>

            <div className="mt-12 pt-6 border-t">
              <h3 className="text-lg font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold mb-4">Share this post</h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
                  aria-label="Share on Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
                  aria-label="Share on Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </article>
    </PageTransition>
  );
};

export default BlogPostDetail;
