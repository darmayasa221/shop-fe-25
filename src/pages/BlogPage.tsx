import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import {
  getAllBlogPosts,
  getBlogPostsByCategory,
} from "../services/blogService";
import { BlogPost, BlogCategory } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import BlogSidebar from "../components/blog/BlogSidebar";

const BlogPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedPosts: BlogPost[];

        if (category) {
          fetchedPosts = await getBlogPostsByCategory(category as BlogCategory);
        } else {
          fetchedPosts = await getAllBlogPosts();
        }

        // Filter by tag if provided
        if (tag) {
          fetchedPosts = fetchedPosts.filter((post) =>
            post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
          );
        }

        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, tag]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`
            : tag
            ? `Articles tagged with "${tag}"`
            : "Blog"}
        </h1>
        <p className="mt-2 text-gray-600">
          {category
            ? `Latest articles about ${category}`
            : tag
            ? `All articles related to ${tag}`
            : "Explore our latest articles and updates"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm"
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
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <p>{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
              <h2 className="mb-2 text-xl font-medium">No articles found</h2>
              <p className="text-gray-600">
                {tag
                  ? `There are no articles tagged with "${tag}"`
                  : category
                  ? `There are no articles in the "${category}" category yet`
                  : "There are no articles available yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <BlogSidebar currentCategory={category as BlogCategory | undefined} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
