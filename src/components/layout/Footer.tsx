import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">ShopName</h3>
            <p className="text-gray-400">Quality products for everyday use.</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>123 Shop Street</p>
              <p>City, State 12345</p>
              <p>Email: info@shopname.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Subscribe</h3>
            <p className="mb-4 text-gray-400">
              Subscribe to our newsletter for updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l px-3 py-2 text-gray-900"
              />
              <button
                type="submit"
                className="rounded-r bg-primary px-4 py-2 font-bold text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-400">
          <p>&copy; {currentYear} ShopName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
