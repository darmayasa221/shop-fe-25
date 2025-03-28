import { useState } from "react";
import { PaymentDetails, PaymentMethod } from "../../types/checkout";

type PaymentFormProps = {
  onSubmit: (paymentDetails: PaymentDetails) => void;
  totalAmount: number;
};

const PaymentForm = ({ onSubmit, totalAmount }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit_card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const sanitized = value.replace(/\D/g, "");
      const parts = [];

      for (let i = 0; i < sanitized.length; i += 4) {
        parts.push(sanitized.substring(i, i + 4));
      }

      const formatted = parts.join(" ").trim();
      setCardDetails((prev) => ({ ...prev, [name]: formatted }));
    }
    // Format expiry date with slash
    else if (name === "expiryDate") {
      const sanitized = value.replace(/\D/g, "");
      if (sanitized.length <= 2) {
        setCardDetails((prev) => ({ ...prev, [name]: sanitized }));
      } else {
        const month = sanitized.substring(0, 2);
        const year = sanitized.substring(2, 4);
        setCardDetails((prev) => ({ ...prev, [name]: `${month}/${year}` }));
      }
    }
    // Regular handling for other fields
    else {
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    };

    if (paymentMethod === "credit_card") {
      // Card number validation
      const cardNumberClean = cardDetails.cardNumber.replace(/\s+/g, "");
      if (!cardNumberClean) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(cardNumberClean)) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      // Card holder validation
      if (!cardDetails.cardHolder) {
        newErrors.cardHolder = "Cardholder name is required";
      }

      // Expiry date validation
      if (!cardDetails.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = "Enter a valid expiry date (MM/YY)";
      } else {
        const [month, year] = cardDetails.expiryDate.split("/");
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (parseInt(month) < 1 || parseInt(month) > 12) {
          newErrors.expiryDate = "Invalid month";
        } else if (
          parseInt(year) < currentYear ||
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)
        ) {
          newErrors.expiryDate = "Card has expired";
        }
      }

      // CVV validation
      if (!cardDetails.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const paymentDetails: PaymentDetails = {
        method: paymentMethod,
      };

      if (paymentMethod === "credit_card") {
        paymentDetails.cardNumber = cardDetails.cardNumber;
        paymentDetails.cardHolder = cardDetails.cardHolder;
        paymentDetails.expiryDate = cardDetails.expiryDate;
        paymentDetails.cvv = cardDetails.cvv;
      }

      onSubmit(paymentDetails);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="mb-4 text-lg font-medium">Payment Method</h3>

      <div className="mb-6">
        <div className="flex space-x-4">
          <div
            className={`flex-1 cursor-pointer rounded-md border border-gray-300 p-4 ${
              paymentMethod === "credit_card" ? "border-primary bg-blue-50" : ""
            }`}
            onClick={() => handleMethodChange("credit_card")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                checked={paymentMethod === "credit_card"}
                onChange={() => handleMethodChange("credit_card")}
                className="h-4 w-4 text-primary"
              />
              <label htmlFor="creditCard" className="ml-2 font-medium">
                Credit Card
              </label>
            </div>
          </div>

          <div
            className={`flex-1 cursor-pointer rounded-md border border-gray-300 p-4 ${
              paymentMethod === "paypal" ? "border-primary bg-blue-50" : ""
            }`}
            onClick={() => handleMethodChange("paypal")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                checked={paymentMethod === "paypal"}
                onChange={() => handleMethodChange("paypal")}
                className="h-4 w-4 text-primary"
              />
              <label htmlFor="paypal" className="ml-2 font-medium">
                PayPal
              </label>
            </div>
          </div>
        </div>
      </div>

      {paymentMethod === "credit_card" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailsChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19} // 16 digits + 3 spaces
              className={`mt-1 block w-full rounded-md border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
              required
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cardHolder"
              className="block text-sm font-medium text-gray-700"
            >
              Cardholder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleCardDetailsChange}
              placeholder="John Doe"
              className={`mt-1 block w-full rounded-md border ${
                errors.cardHolder ? "border-red-500" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
              required
            />
            {errors.cardHolder && (
              <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                placeholder="MM/YY"
                maxLength={5} // MM/YY format
                className={`mt-1 block w-full rounded-md border ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
                required
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                placeholder="123"
                maxLength={4}
                className={`mt-1 block w-full rounded-md border ${
                  errors.cvv ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
                required
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div className="rounded-md bg-gray-50 p-4 text-center">
          <p className="text-gray-700">
            You will be redirected to PayPal to complete your payment.
          </p>
        </div>
      )}

      <div className="mt-8 rounded-md bg-gray-50 p-4">
        <div className="flex justify-between font-medium">
          <span>Total Payment:</span>
          <span className="text-lg text-primary">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white shadow-sm hover:bg-primary/90"
        >
          {paymentMethod === "credit_card" ? "Pay Now" : "Continue to PayPal"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
