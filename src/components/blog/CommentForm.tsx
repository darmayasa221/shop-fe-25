import { useState } from "react";
import { addBlogComment } from "../../services/blogService";

type CommentFormProps = {
  postId: string;
  onCommentAdded: () => void;
};

const CommentForm = ({ postId, onCommentAdded }: CommentFormProps) => {
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    author: "",
    email: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      author: "",
      email: "",
      content: "",
    };

    if (!formData.author.trim()) {
      newErrors.author = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Comment cannot be empty";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addBlogComment(postId, {
        author: formData.author,
        email: formData.email,
        content: formData.content,
      });

      // Reset form and show success message
      setFormData({
        author: "",
        email: "",
        content: "",
      });

      setSubmitSuccess(true);

      // Notify parent component
      onCommentAdded();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-medium">Leave a Comment</h3>

      {submitSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800">
          Your comment has been submitted successfully and will be visible after
          moderation.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="author"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.author ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-500">{errors.author}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="content"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={5}
              value={formData.content}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.content ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
            ></textarea>
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
