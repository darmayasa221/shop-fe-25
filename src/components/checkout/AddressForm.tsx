import { useState } from "react";
import { AddressType } from "../../types/checkout";

type AddressFormProps = {
  title: string;
  onSubmit: (address: AddressType) => void;
  initialAddress?: AddressType;
};

// Default countries - in a real app, you'd have more countries
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
];

// Default states - in a real app, this would be dynamic based on country
const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "IL", name: "Illinois" },
  { code: "NY", name: "New York" },
  { code: "TX", name: "Texas" },
  { code: "WA", name: "Washington" },
];

const AddressForm = ({ title, onSubmit, initialAddress }: AddressFormProps) => {
  const [address, setAddress] = useState<AddressType>(
    initialAddress || {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressType, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof AddressType]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddressType, string>> = {};

    // Required fields validation
    if (!address.fullName) newErrors.fullName = "Full name is required";
    if (!address.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.postalCode) newErrors.postalCode = "Postal code is required";
    if (!address.country) newErrors.country = "Country is required";
    if (!address.phone) newErrors.phone = "Phone number is required";

    // Phone validation - simple check for now
    if (
      address.phone &&
      !/^\d{10,15}$/.test(address.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Enter a valid phone number";
    }

    // Postal code validation - simple check for now
    if (address.postalCode && !/^\d{5}(-\d{4})?$/.test(address.postalCode)) {
      newErrors.postalCode =
        "Enter a valid postal code (e.g., 12345 or 12345-6789)";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(address);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="mb-4 text-lg font-medium">{title}</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={address.addressLine1}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.addressLine1 ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            placeholder="Street address, P.O. box"
            required
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-500">{errors.addressLine1}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700"
          >
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2 || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            required
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State / Province <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.state ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            required
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-500">{errors.state}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip / Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            required
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">{errors.country}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } px-3 py-2 shadow-sm focus:border-primary focus:outline-none`}
            placeholder="For shipping questions"
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white shadow-sm hover:bg-primary/90"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
