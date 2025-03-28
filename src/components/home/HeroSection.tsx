import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Quality Products</span>
              <span className="block text-primary">For Your Lifestyle</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Discover our curated collection of premium products that enhance
              your everyday life. Shop with confidence with our secure checkout
              and fast shipping.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
              <Link
                to="/shop"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/images/hero-image.jpg"
              alt="Premium lifestyle products"
              className="w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
