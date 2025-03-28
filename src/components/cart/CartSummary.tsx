import { Link } from "react-router";
import { useCart } from "../../contexts/CartContext";

type CartSummaryProps = {
  onCheckout?: () => void;
};

const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const { cartItems, getCartTotal } = useCart();

  // Calculate values
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // Assuming 10% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-medium">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {shipping > 0 && (
          <div className="text-xs text-gray-500">
            Free shipping on orders over $100
          </div>
        )}

        <div className="my-4 border-t border-gray-200 pt-4"></div>

        <div className="flex justify-between">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/checkout"
          onClick={handleCheckout}
          className={`block w-full rounded bg-primary py-3 text-center font-medium text-white hover:bg-primary/90 ${
            cartItems.length === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          aria-disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Link>

        <Link
          to="/shop"
          className="mt-4 block w-full rounded border border-gray-300 py-3 text-center font-medium hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
