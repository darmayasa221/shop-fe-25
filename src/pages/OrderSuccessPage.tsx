import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { OrderDetails } from "../types/checkout";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as OrderDetails | undefined;

  // Redirect if no order data
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-bold">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Your order has been received and is being processed.
          </p>
        </div>

        <div className="mb-8 rounded-md bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-medium">Order Details</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{order.orderId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium">
                {order.orderDate.toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{order.customer.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="font-medium">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-medium">Order Summary</h2>

          <div className="mb-4 space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-2 font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-medium">Shipping Address</h2>
          <address className="not-italic">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && (
              <p>{order.shippingAddress.addressLine2}</p>
            )}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </address>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            to="/"
            className="rounded border border-gray-300 px-6 py-2 text-center font-medium hover:bg-gray-50"
          >
            Return to Home
          </Link>

          <Link
            to="/shop"
            className="rounded bg-primary px-6 py-2 text-center font-medium text-white hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
