import { Link } from "react-router";

const PromoBanner = () => {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold text-white">Summer Sale</h2>
            <p className="mb-4 text-lg text-white/80">
              Enjoy up to 40% off on selected items. Limited time offer.
            </p>
            <Link
              to="/shop?sale=true"
              className="inline-block rounded-md bg-white px-6 py-3 font-medium text-primary shadow-sm transition-colors hover:bg-gray-100"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative hidden w-64 md:block lg:w-80">
            <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-center text-xl font-bold text-primary">
              40% OFF
            </div>
            <img
              src="/images/promo-product.jpg"
              alt="Summer sale featured product"
              className="w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
