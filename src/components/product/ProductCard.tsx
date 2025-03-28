import { Link } from "react-router";
import { Product } from "../../types/product";
import { useCart } from "../../contexts/CartContext";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-square overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {product.salePrice && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            Sale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          to={`/product/${product.id}`}
          className="mb-2 text-lg font-medium hover:text-primary"
        >
          {product.name}
        </Link>

        <p className="mb-4 flex-1 text-sm text-gray-600">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="rounded bg-primary px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
