import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  getBlogCategories,
  getRecentBlogPosts,
} from "../../services/blogService";
import { BlogPost, BlogCategory } from "../../types/blog";

type BlogSidebarProps = {
  currentCategory?: BlogCategory;
};

const BlogSidebar = ({ currentCategory }: BlogSidebarProps) => {
  const [categories, setCategories] = useState<
    { category: BlogCategory; count: number }[]
  >([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSidebarData = async () => {
      setLoading(true);
      try {
        const [categoriesData, recentPostsData] = await Promise.all([
          getBlogCategories(),
          getRecentBlogPosts(4),
        ]);

        setCategories(categoriesData);
        setRecentPosts(recentPostsData);
      } catch (error) {
        console.error("Error loading sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSidebarData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-3 w-full animate-pulse rounded bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/blog"
              className={`flex justify-between hover:text-primary ${
                !currentCategory ? "font-medium text-primary" : "text-gray-600"
              }`}
            >
              <span>All</span>
              <span className="text-gray-500">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </Link>
          </li>
          {categories.map(({ category, count }) => (
            <li key={category}>
              <Link
                to={`/blog/category/${category}`}
                className={`flex justify-between hover:text-primary ${
                  currentCategory === category
                    ? "font-medium text-primary"
                    : "text-gray-600"
                }`}
              >
                <span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="text-gray-500">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex">
              <div className="mr-3 h-16 w-16 shrink-0 overflow-hidden rounded">
                <Link to={`/blog/${post.slug}`}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
              <div>
                <h4 className="mb-1 font-medium leading-tight">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h4>
                <div className="text-xs text-gray-500">
                  {post.publishDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(recentPosts.flatMap((post) => post.tags)))
            .slice(0, 10)
            .map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
              >
                {tag}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
