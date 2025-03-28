/**
 * Format a number as a currency string
 * @param value - The numeric value to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format a date as a string
 * @param date - The date to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param options - Additional options for the formatter
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  const dateToFormat = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateToFormat);
};

/**
 * Truncate a string to a specific length and add ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncating
 * @returns Truncated string with ellipsis if needed
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
};

/**
 * Calculate discount percentage
 * @param originalPrice - The original price
 * @param discountedPrice - The discounted price
 * @returns Discount percentage as a whole number
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  const discount = originalPrice - discountedPrice;
  const percentage = (discount / originalPrice) * 100;
  return Math.round(percentage);
};

/**
 * Format a phone number to a standard format
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }

  // If it doesn't match expected formats, return original
  return phoneNumber;
};

/**
 * Format a credit card number with masked digits
 * @param cardNumber - The card number to format
 * @returns Formatted card number with masked digits
 */
export const formatCardNumber = (cardNumber: string): string => {
  // Remove all non-numeric characters
  const cleaned = cardNumber.replace(/\D/g, "");

  // Keep only last 4 digits visible
  const lastFour = cleaned.slice(-4);
  const masked = "xxxx-xxxx-xxxx-";

  return masked + lastFour;
};
