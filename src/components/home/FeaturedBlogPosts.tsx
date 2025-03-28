import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getFeaturedBlogPosts } from "../../services/blogService";
import { BlogPost } from "../../types/blog";
import BlogCard from "../blog/BlogCard";

const FeaturedBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const featuredPosts = await getFeaturedBlogPosts();
        setPosts(featuredPosts.slice(0, 3)); // Limit to 3 posts
      } catch (error) {
        console.error("Error loading featured blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            From Our Blog
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Read our latest articles for product tips, trends, and lifestyle
            inspiration
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="aspect-video w-full animate-pulse bg-gray-200"></div>
                <div className="p-4">
                  <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/blog"
                className="inline-block rounded-md border border-primary bg-white px-6 py-3 font-medium text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
              >
                Read More Articles
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogPosts;
