import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getBlogPostBySlug } from "../services/blogService";
import { BlogPost } from "../types/blog";
import BlogSidebar from "../components/blog/BlogSidebar";
import CommentForm from "../components/blog/CommentForm";
import CommentList from "../components/blog/CommentList";
// You'll need to install a markdown parser like react-markdown
// For this example, we'll assume we're using plain HTML

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshComments, setRefreshComments] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const fetchedPost = await getBlogPostBySlug(slug);

        if (!fetchedPost) {
          setError("Blog post not found");
        } else {
          setPost(fetchedPost);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, refreshComments]);

  const handleCommentAdded = () => {
    // Refresh comments by incrementing the refresh counter
    setRefreshComments((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 w-full animate-pulse rounded bg-gray-200"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          {error || "Blog post not found"}
        </h1>
        <p className="mb-8 text-gray-600">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/blog"
          className="rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <nav className="mb-4 text-sm">
          <ol className="flex flex-wrap items-center">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary">
                Home
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to="/blog" className="text-gray-500 hover:text-primary">
                Blog
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link
                to={`/blog/category/${post.category}`}
                className="text-gray-500 hover:text-primary"
              >
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="font-medium text-gray-900">{post.title}</li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <article className="rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Featured Image */}
            <div className="relative h-64 w-full overflow-hidden sm:h-96">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-6">
              <div className="mb-4">
                <span className="inline-block rounded bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {post.category.charAt(0).toUpperCase() +
                    post.category.slice(1)}
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="mr-2 h-8 w-8 rounded-full object-cover"
                  />
                  <span>{post.author.name}</span>
                </div>

                <div>
                  <span>
                    {post.publishDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>

              {/* Article Content - In a real app, use a markdown parser */}
              <div className="prose max-w-none">
                {/* This is where you'd render the markdown content */}
                {/* For simplicity, we'll just use a basic implementation */}
                {post.content.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={index} className="mb-4 mt-6 text-3xl font-bold">
                        {line.substring(2)}
                      </h1>
                    );
                  } else if (line.startsWith("## ")) {
                    return (
                      <h2 key={index} className="mb-3 mt-5 text-2xl font-bold">
                        {line.substring(3)}
                      </h2>
                    );
                  } else if (line.startsWith("### ")) {
                    return (
                      <h3 key={index} className="mb-2 mt-4 text-xl font-bold">
                        {line.substring(4)}
                      </h3>
                    );
                  } else if (line.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-6">
                        {line.substring(2)}
                      </li>
                    );
                  } else if (line.trim() === "") {
                    return <br key={index} />;
                  } else {
                    return (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${tag}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="mr-4 h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="mb-1 text-lg font-medium">
                      {post.author.name}
                    </h3>
                    <p className="text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-8 space-y-6">
            <CommentList comments={post.comments} />
            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <BlogSidebar currentCategory={post.category} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
