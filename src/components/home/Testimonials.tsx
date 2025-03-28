const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Loyal Customer",
    avatar: "/images/testimonials/customer1.jpg",
    content:
      "I've been shopping here for years and have always been impressed with the quality of products and customer service. The checkout process is seamless and shipping is always fast.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    avatar: "/images/testimonials/customer2.jpg",
    content:
      "As a first-time customer, I was pleasantly surprised by how easy it was to navigate the site and find exactly what I needed. My order arrived ahead of schedule and exceeded my expectations.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Regular Shopper",
    avatar: "/images/testimonials/customer3.jpg",
    content:
      "The product quality is consistently excellent, and I appreciate the detailed descriptions that help me make informed decisions. The return process is also hassle-free when needed.",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Hear from our satisfied customers about their shopping experiences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="relative">
                <svg
                  className="absolute -left-2 -top-2 h-8 w-8 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative pl-6 text-gray-600">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
