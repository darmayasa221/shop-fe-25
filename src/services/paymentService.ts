import { OrderDetails, PaymentDetails } from "../types/checkout";

// Generate a random order ID
const generateOrderId = () => {
  return `ORD-${Math.floor(Math.random() * 10000)}-${Date.now()
    .toString()
    .slice(-4)}`;
};

// Simulate payment processing
export const processPayment = async (
  paymentDetails: PaymentDetails,
  amount: number
): Promise<{ success: boolean; transactionId: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simple validation (in a real app, this would be done by the payment processor)
  if (paymentDetails.method === "credit_card") {
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.cardHolder ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv
    ) {
      throw new Error("Invalid credit card details");
    }

    // Simple validation for card number format (just checking if it's 16 digits)
    const cardNumberClean = paymentDetails.cardNumber.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(cardNumberClean)) {
      throw new Error("Invalid card number format");
    }
  }

  // Simulate successful payment (you could add logic to randomly fail some payments for testing)
  const transactionId = `TXN-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;

  return {
    success: true,
    transactionId,
  };
};

// Create order in the system
export const createOrder = async (
  orderData: Omit<OrderDetails, "orderId" | "orderDate">
): Promise<OrderDetails> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would send the order to your backend
  const order: OrderDetails = {
    ...orderData,
    orderId: generateOrderId(),
    orderDate: new Date(),
  };

  return order;
};
