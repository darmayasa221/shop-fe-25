import { Link } from "react-router";
import { CartItem as CartItemType } from "../../contexts/CartContext";

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onUpdateQuantity(product.id, value);
    }
  };

  const incrementQuantity = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col border-b border-gray-200 py-4 sm:flex-row">
      {/* Product Image */}
      <div className="mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 sm:mb-0">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="ml-0 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <Link
              to={`/product/${product.id}`}
              className="text-lg font-medium text-gray-900 hover:text-primary"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-sm text-gray-500">
              Category:{" "}
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
          </div>

          <div className="mt-2 sm:mt-0">
            <p className="text-right font-medium text-gray-900">
              {product.salePrice
                ? `$${product.salePrice.toFixed(2)}`
                : `$${product.price.toFixed(2)}`}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
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
              min="1"
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

          <button
            onClick={() => onRemove(product.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
