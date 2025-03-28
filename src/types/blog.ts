export type BlogCategory =
  | "fashion"
  | "technology"
  | "lifestyle"
  | "business"
  | "travel";

export type BlogComment = {
  id: string;
  author: string;
  email: string;
  content: string;
  date: Date;
  replies?: BlogComment[];
};

export type BlogAuthor = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishDate: Date;
  comments: BlogComment[];
  featured: boolean;
};
