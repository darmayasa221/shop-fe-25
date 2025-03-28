import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { AddressType, OrderDetails, PaymentDetails } from "../types/checkout";
import { processPayment, createOrder } from "../services/paymentService";
import CustomerInfoForm from "../components/checkout/CustomerInfoForm";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

// Define checkout steps
type CheckoutStep =
  | "customer_info"
  | "shipping"
  | "billing"
  | "payment"
  | "confirmation";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer_info");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  // Form data states
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [shippingAddress, setShippingAddress] = useState<AddressType | null>(
    null
  );
  const [billingAddress, setBillingAddress] = useState<AddressType | null>(
    null
  );
  const [useSameAddress, setUseSameAddress] = useState(true);

  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && currentStep !== "confirmation") {
      navigate("/shop");
    }
  }, [cartItems, navigate, currentStep]);

  const handleCustomerInfoSubmit = (data: {
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    setCustomerInfo(data);
    setCurrentStep("shipping");
    window.scrollTo(0, 0);
  };

  const handleShippingAddressSubmit = (address: AddressType) => {
    setShippingAddress(address);

    if (useSameAddress) {
      setBillingAddress(address);
      setCurrentStep("payment");
    } else {
      setCurrentStep("billing");
    }

    window.scrollTo(0, 0);
  };

  const handleBillingAddressSubmit = (address: AddressType) => {
    setBillingAddress(address);
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (paymentDetails: PaymentDetails) => {
    if (!shippingAddress || !billingAddress) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Process payment
      const paymentResult = await processPayment(paymentDetails, total);

      if (paymentResult.success) {
        // Create order
        const orderData: Omit<OrderDetails, "orderId" | "orderDate"> = {
          customer: {
            email: customerInfo.email,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
          },
          shippingAddress,
          billingAddress,
          payment: paymentDetails,
          items: cartItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.salePrice ?? item.product.price,
            quantity: item.quantity,
          })),
          subtotal,
          tax,
          shipping,
          total,
        };

        const createdOrder = await createOrder(orderData);
        setOrder(createdOrder);

        // Clear cart and move to confirmation
        clearCart();
        setCurrentStep("confirmation");
        window.scrollTo(0, 0);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during payment processing"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "customer_info":
        return (
          <CustomerInfoForm
            onSubmit={handleCustomerInfoSubmit}
            initialData={customerInfo}
          />
        );

      case "shipping":
        return (
          <div>
            <AddressForm
              title="Shipping Address"
              onSubmit={handleShippingAddressSubmit}
              initialAddress={shippingAddress || undefined}
            />

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="sameAsBilling"
                checked={useSameAddress}
                onChange={(e) => setUseSameAddress(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="sameAsBilling" className="ml-2 text-sm">
                Billing address is the same as shipping address
              </label>
            </div>
          </div>
        );

      case "billing":
        return (
          <AddressForm
            title="Billing Address"
            onSubmit={handleBillingAddressSubmit}
            initialAddress={billingAddress || undefined}
          />
        );

      case "payment":
        return (
          <PaymentForm onSubmit={handlePaymentSubmit} totalAmount={total} />
        );

      case "confirmation":
        return order ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
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

            <h2 className="mb-2 text-2xl font-medium text-green-800">
              Order Confirmed!
            </h2>

            <p className="mb-6 text-green-700">
              Thank you for your purchase. Your order has been received and will
              be processed soon.
            </p>

            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 text-left">
              <h3 className="mb-2 font-medium">Order Details</h3>
              <p className="mb-1 text-sm">
                <span className="text-gray-600">Order ID:</span> {order.orderId}
              </p>
              <p className="mb-1 text-sm">
                <span className="text-gray-600">Date:</span>{" "}
                {order.orderDate.toLocaleDateString()}
              </p>
              <p className="mb-1 text-sm">
                <span className="text-gray-600">Total:</span> $
                {order.total.toFixed(2)}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Email:</span>{" "}
                {order.customer.email}
              </p>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => navigate("/")}
                className="rounded border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50"
              >
                Return to Home
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="rounded bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Order information not available.</p>
          </div>
        );
    }
  };

  // If checkout is confirmed and cart is empty, don't check for empty cart
  if (currentStep === "confirmation" && order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Order Confirmation
        </h1>
        {renderCurrentStep()}
      </div>
    );
  }

  // Don't render anything if cart is empty and not on confirmation step
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      {/* Checkout Progress */}
      <div className="mb-8 hidden md:block">
        <div className="flex items-center justify-between">
          <div
            className={`flex flex-col items-center ${
              currentStep === "customer_info"
                ? "text-primary"
                : currentStep === "shipping" ||
                  currentStep === "billing" ||
                  currentStep === "payment" ||
                  currentStep === "confirmation"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "customer_info"
                  ? "bg-primary text-white"
                  : currentStep === "shipping" ||
                    currentStep === "billing" ||
                    currentStep === "payment" ||
                    currentStep === "confirmation"
                  ? "bg-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              1
            </div>
            <span className="mt-1 text-xs">Customer Info</span>
          </div>

          <div className="flex-1 border-t border-gray-300"></div>

          <div
            className={`flex flex-col items-center ${
              currentStep === "shipping"
                ? "text-primary"
                : currentStep === "billing" ||
                  currentStep === "payment" ||
                  currentStep === "confirmation"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "shipping"
                  ? "bg-primary text-white"
                  : currentStep === "billing" ||
                    currentStep === "payment" ||
                    currentStep === "confirmation"
                  ? "bg-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              2
            </div>
            <span className="mt-1 text-xs">Shipping</span>
          </div>

          <div className="flex-1 border-t border-gray-300"></div>

          <div
            className={`flex flex-col items-center ${
              currentStep === "billing"
                ? "text-primary"
                : currentStep === "payment" || currentStep === "confirmation"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "billing"
                  ? "bg-primary text-white"
                  : currentStep === "payment" || currentStep === "confirmation"
                  ? "bg-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              3
            </div>
            <span className="mt-1 text-xs">Billing</span>
          </div>

          <div className="flex-1 border-t border-gray-300"></div>

          <div
            className={`flex flex-col items-center ${
              currentStep === "payment"
                ? "text-primary"
                : currentStep === "confirmation"
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep === "payment"
                  ? "bg-primary text-white"
                  : currentStep === "confirmation"
                  ? "bg-green-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              4
            </div>
            <span className="mt-1 text-xs">Payment</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-red-800">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 lg:order-1">
          {isProcessing ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-primary"></div>
              <p className="text-lg font-medium">Processing your payment...</p>
              <p className="mt-2 text-gray-600">
                Please do not close or refresh this page.
              </p>
            </div>
          ) : (
            renderCurrentStep()
          )}
        </div>

        <div className="lg:col-span-1 lg:order-2">
          <CheckoutSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
