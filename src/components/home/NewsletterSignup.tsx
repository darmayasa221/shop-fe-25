import { useState } from "react";

// Mock service to handle newsletter subscription
const subscribeToNewsletter = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would send the email to your backend
  return {
    success: true,
    message: "Successfully subscribed to our newsletter!",
  };
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setEmail("");
        setMessage({ text: result.message, type: "success" });
      } else {
        setMessage({ text: result.message, type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-lg bg-gradient-to-r from-primary to-primary/80 p-8 shadow-lg">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6 text-white/80">
              Stay updated with our latest products, promotions, and articles.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full flex-1 rounded-l-md border-0 px-4 py-3 focus:ring-2 focus:ring-white/50 sm:rounded-r-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 rounded-r-md bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-600 sm:mt-0"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              {message && (
                <p
                  className={`mt-4 text-sm ${
                    message.type === "success"
                      ? "text-green-100"
                      : "text-red-100"
                  }`}
                >
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
