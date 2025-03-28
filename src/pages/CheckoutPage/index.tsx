import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import PageTransition from "../../components/common/PageTransition";
import useCart from "../../hooks/useCart";
import { getProductById } from "../../data/products";

// Form interfaces
interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

enum CheckoutStep {
  SHIPPING = "shipping",
  PAYMENT = "payment",
  REVIEW = "review",
  CONFIRMATION = "confirmation",
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartState, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.SHIPPING
  );

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (
      cartState.items.length === 0 &&
      currentStep !== CheckoutStep.CONFIRMATION
    ) {
      navigate("/shop");
    }
  }, [cartState.items.length, navigate, currentStep]);

  // Generate order number for confirmation
  useEffect(() => {
    if (currentStep === CheckoutStep.CONFIRMATION) {
      const randomOrderNum =
        "ORD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrderNum);
    }
  }, [currentStep]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.PAYMENT);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.REVIEW);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setCurrentStep(CheckoutStep.CONFIRMATION);
    clearCart();
    window.scrollTo(0, 0);
  };

  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingMethod(e.target.value);
  };

  // Calculate shipping cost
  const shippingCost = shippingMethod === "express" ? 15.99 : 7.99;

  // Calculate total with shipping
  const total = cartState.total + shippingCost;

  return (
    <PageTransition className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Checkout Progress */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between">
            {Object.values(CheckoutStep)
              .slice(0, 3)
              .map((step, index) => (
                <div
                  key={step}
                  className={`relative flex flex-col items-center ${
                    index < Object.values(CheckoutStep).indexOf(currentStep)
                      ? "text-green-600"
                      : index ===
                        Object.values(CheckoutStep).indexOf(currentStep)
                      ? "text-black"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      index < Object.values(CheckoutStep).indexOf(currentStep)
                        ? "border-green-600 bg-green-600 text-white"
                        : index ===
                          Object.values(CheckoutStep).indexOf(currentStep)
                        ? "border-black text-black"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {index <
                    Object.values(CheckoutStep).indexOf(currentStep) ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="text-sm mt-2 font-medium capitalize">
                    {step}
                  </div>

                  {/* Connector line */}
                  {index < Object.values(CheckoutStep).length - 2 && (
                    <div
                      className={`absolute top-5 w-full h-0.5 left-1/2 ${
                        index < Object.values(CheckoutStep).indexOf(currentStep)
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                      style={{ width: "100%" }}
                    ></div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Checkout Content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {/* Shipping Step */}
              {currentStep === CheckoutStep.SHIPPING && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          State/Province*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="postalCode"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Postal Code*
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingInfoChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        Shipping Method
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center border p-4 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={shippingMethod === "standard"}
                            onChange={handleShippingMethodChange}
                            className="h-4 w-4 text-black focus:ring-black"
                          />
                          <div className="ml-3 flex flex-grow justify-between">
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-gray-500">
                                3-5 business days
                              </p>
                            </div>
                            <p className="font-medium">$7.99</p>
                          </div>
                        </label>

                        <label className="flex items-center border p-4 rounded-md cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={shippingMethod === "express"}
                            onChange={handleShippingMethodChange}
                            className="h-4 w-4 text-black focus:ring-black"
                          />
                          <div className="ml-3 flex flex-grow justify-between">
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-gray-500">
                                1-2 business days
                              </p>
                            </div>
                            <p className="font-medium">$15.99</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
                    >
                      Continue to Payment
                    </motion.button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === CheckoutStep.PAYMENT && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                      className="text-gray-600 mr-3 hover:text-black transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold">Payment Information</h2>
                  </div>

                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="cardHolder"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Cardholder Name*
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={paymentInfo.cardHolder}
                        onChange={handlePaymentInfoChange}
                        placeholder="John Smith"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/YY"
                          required
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          required
                          maxLength={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-600">
                        This is a demo checkout. No actual payment will be
                        processed. Feel free to use any test card information.
                        For actual implementation, secure payment processing
                        would be integrated here.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
                    >
                      Continue to Review
                    </motion.button>
                  </form>
                </div>
              )}

              {/* Review Step */}
              {currentStep === CheckoutStep.REVIEW && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
                      className="text-gray-600 mr-3 hover:text-black transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold">Review Your Order</h2>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-medium text-lg mb-3">
                      Shipping Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state}{" "}
                        {shippingInfo.postalCode}
                      </p>
                      <p className="mt-2">{shippingInfo.email}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-medium text-lg mb-3">
                      Payment Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                      <p className="capitalize">{paymentInfo.cardHolder}</p>
                      <p>Expires {paymentInfo.expiryDate}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-medium text-lg mb-3">
                      Shipping Method
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium capitalize">
                        {shippingMethod} Shipping
                      </p>
                      <p className="text-gray-600">
                        {shippingMethod === "express"
                          ? "1-2 business days"
                          : "3-5 business days"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
                    >
                      Place Order
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === CheckoutStep.CONFIRMATION && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Your order has been received
                  </p>

                  <div className="mb-8">
                    <p className="text-gray-700">Order Number:</p>
                    <p className="text-2xl font-bold">{orderNumber}</p>
                  </div>

                  <p className="text-gray-600 mb-8">
                    We've sent a confirmation email to {shippingInfo.email} with
                    your order details.
                  </p>

                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/shop")}
                      className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          {currentStep !== CheckoutStep.CONFIRMATION && (
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="max-h-80 overflow-y-auto mb-6 space-y-4">
                  {cartState.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    const price = product.discountedPrice || product.price;
                    const totalPrice = price * item.quantity;

                    return (
                      <div key={item.productId} className="flex items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium">
                          ${totalPrice.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartState.subtotal.toFixed(2)}</span>
                  </div>

                  {cartState.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${cartState.discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutPage;
