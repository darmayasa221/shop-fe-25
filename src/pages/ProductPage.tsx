import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getProductById, filterProducts } from "../services/productService";
import { Product } from "../types/product";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/product/ProductCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await getProductById(id);

        if (!productData) {
          console.error("Product not found");
          return;
        }

        setProduct(productData);

        // Load related products from same category
        const related = await filterProducts(productData.category);
        setRelatedProducts(
          related.filter((p) => p.id !== productData.id).slice(0, 4)
        );
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
    // Reset quantity when product changes
    setQuantity(1);
    setActiveImage(0);
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (product && value > product.stockQuantity) {
      setQuantity(product.stockQuantity);
    } else {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Optional: Show success message or redirect to cart
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p className="mb-8 text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary">
              Home
            </Link>
          </li>
          <li className="mx-2 text-gray-400">/</li>
          <li>
            <Link to="/shop" className="text-gray-500 hover:text-primary">
              Shop
            </Link>
          </li>
          <li className="mx-2 text-gray-400">/</li>
          <li>
            <Link
              to={`/shop?category=${product.category}`}
              className="text-gray-500 hover:text-primary"
            >
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Link>
          </li>
          <li className="mx-2 text-gray-400">/</li>
          <li className="font-medium text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-contain object-center"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 overflow-hidden rounded-md ${
                    activeImage === index
                      ? "ring-2 ring-primary"
                      : "border border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="ml-2 text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  Sale
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mb-6">
            <div
              className={`mb-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {product.inStock && (
              <p className="text-sm text-gray-600">
                {product.stockQuantity} items available
              </p>
            )}
          </div>

          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Product Tags */}
          {product.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/shop?search=${tag}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          {product.inStock && (
            <div className="mb-8">
              <div className="mb-4 flex items-center">
                <label htmlFor="quantity" className="mr-4 font-medium">
                  Quantity:
                </label>
                <div className="flex h-10 w-32">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="flex w-10 items-center justify-center rounded-l border border-r-0 border-gray-300 bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full border-y border-gray-300 px-2 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="flex w-10 items-center justify-center rounded-r border border-l-0 border-gray-300 bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center rounded bg-primary px-6 py-3 text-white hover:bg-primary/90"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
