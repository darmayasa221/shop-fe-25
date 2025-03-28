export type AddressType = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type PaymentMethod = "credit_card" | "paypal";

export type PaymentDetails = {
  method: PaymentMethod;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
};

export type OrderDetails = {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  shippingAddress: AddressType;
  billingAddress: AddressType;
  payment: PaymentDetails;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  orderId: string;
  orderDate: Date;
};
