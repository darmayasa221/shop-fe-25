const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">About Us</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Learn more about our company, our mission, and the values that drive
          us.
        </p>
      </div>

      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
          <p className="mb-4 text-gray-600">
            Founded in 2015, ShopName began with a simple mission: to provide
            high-quality products that enhance everyday life. What started as a
            small online store has grown into a trusted e-commerce destination
            for thousands of customers.
          </p>
          <p className="text-gray-600">
            Our journey has been guided by our commitment to customer
            satisfaction, product excellence, and sustainable business
            practices. As we've grown, we've maintained our focus on these core
            values while expanding our product offerings to serve a wider range
            of needs.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/about/our-story.jpg"
            alt="Our company story"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Our Values</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            These principles guide everything we do - from product selection to
            customer service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Quality First</h3>
            <p className="text-gray-600">
              We carefully select each product for durability, performance, and
              value. Our quality standards mean you can shop with confidence.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Customer Focus</h3>
            <p className="text-gray-600">
              Every decision we make centers on enhancing your shopping
              experience. Your satisfaction is our top priority.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to reducing our environmental impact through
              eco-friendly products, minimal packaging, and sustainable
              operations.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Our Team</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Meet the dedicated professionals who make our vision a reality
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mb-4 h-48 w-48 mx-auto overflow-hidden rounded-full">
              <img
                src="/images/team/ceo.jpg"
                alt="CEO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Jane Smith</h3>
            <p className="text-primary">CEO & Founder</p>
          </div>

          <div className="text-center">
            <div className="mb-4 h-48 w-48 mx-auto overflow-hidden rounded-full">
              <img
                src="/images/team/cto.jpg"
                alt="CTO"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">David Johnson</h3>
            <p className="text-primary">CTO</p>
          </div>

          <div className="text-center">
            <div className="mb-4 h-48 w-48 mx-auto overflow-hidden rounded-full">
              <img
                src="/images/team/marketing.jpg"
                alt="Marketing Director"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Emily Chen</h3>
            <p className="text-primary">Marketing Director</p>
          </div>

          <div className="text-center">
            <div className="mb-4 h-48 w-48 mx-auto overflow-hidden rounded-full">
              <img
                src="/images/team/customer-service.jpg"
                alt="Customer Service Manager"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">Michael Rodriguez</h3>
            <p className="text-primary">Customer Service Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
