import { CartItem } from "../../contexts/CartContext";

type CheckoutSummaryProps = {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

const CheckoutSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutSummaryProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-medium">Order Summary</h3>

        <div className="mb-6 max-h-80 overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.product.id} className="mb-4 flex items-center">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-full w-full object-cover object-center"
                />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {item.quantity}
                </span>
              </div>

              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium">{item.product.name}</h4>
                <div className="mt-1 text-xs text-gray-500">
                  ${(item.product.salePrice ?? item.product.price).toFixed(2)} x{" "}
                  {item.quantity}
                </div>
              </div>

              <div className="ml-4 text-right">
                <span className="font-medium">
                  $
                  {(
                    (item.product.salePrice ?? item.product.price) *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
