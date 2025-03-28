import { Link } from "react-router";
import { BlogPost } from "../../types/blog";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded bg-primary/80 px-2 py-1 text-xs font-medium text-white">
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2 flex items-center text-xs text-gray-500">
          <span>
            {post.publishDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="mx-2">•</span>
          <span>{post.comments.length} comments</span>
        </div>

        <h3 className="mb-2 text-xl font-bold">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>

        <p className="mb-4 text-gray-600">{post.excerpt}</p>

        <div className="flex items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="mr-3 h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
