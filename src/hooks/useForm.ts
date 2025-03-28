/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, FormEvent } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
}

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

type ErrorMessages<T> = {
  [K in keyof T]?: string;
};

type UseFormReturn<T> = {
  values: T;
  errors: ErrorMessages<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValues: (values: Partial<T>) => void;
  resetForm: () => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: FormEvent) => void;
};

/**
 * Custom hook for form handling with validation
 * @param initialValues - Initial form values
 * @param validationRules - Rules for form validation
 * @returns Form handling utilities
 */
function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorMessages<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: any): string | undefined => {
      const rules = validationRules[name];
      if (!rules) return undefined;

      if (rules.required && !value) {
        return "This field is required";
      }

      if (
        rules.minLength &&
        typeof value === "string" &&
        value.length < rules.minLength
      ) {
        return `Must be at least ${rules.minLength} characters`;
      }

      if (
        rules.maxLength &&
        typeof value === "string" &&
        value.length > rules.maxLength
      ) {
        return `Must be less than ${rules.maxLength} characters`;
      }

      if (
        rules.pattern &&
        typeof value === "string" &&
        !rules.pattern.test(value)
      ) {
        return "Invalid format";
      }

      if (rules.validate) {
        const validationResult = rules.validate(value);
        if (typeof validationResult === "string") {
          return validationResult;
        }
        if (validationResult === false) {
          return "Invalid value";
        }
      }

      return undefined;
    },
    [validationRules]
  );

  // Validate all fields
  const validateForm = useCallback((): ErrorMessages<T> => {
    const newErrors: ErrorMessages<T> = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T;
      const errorMessage = validateField(fieldName, values[fieldName]);
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
        hasErrors = true;
      }
    });

    return newErrors;
  }, [validateField, validationRules, values]);

  // Handle input change
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;

      // Handle different input types
      const parsedValue =
        type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value;

      setValues((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));

      // If field has been touched, validate on change
      if (touched[name as keyof T]) {
        const errorMessage = validateField(name as keyof T, parsedValue);
        setErrors((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    },
    [touched, validateField]
  );

  // Handle input blur (validate on blur)
  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      const errorMessage = validateField(name as keyof T, value);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    },
    [validateField]
  );

  // Update form values (useful for filling form with existing data)
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (e: FormEvent) => {
      e.preventDefault();

      setIsSubmitting(true);

      // Mark all fields as touched
      const touchedFields: Partial<Record<keyof T, boolean>> = {};
      Object.keys(values).forEach((key) => {
        touchedFields[key as keyof T] = true;
      });
      setTouched(touchedFields);

      // Validate all fields
      const newErrors = validateForm();
      setErrors(newErrors);

      // If form is valid, call onSubmit
      if (Object.keys(newErrors).length === 0) {
        onSubmit(values);
      }

      setIsSubmitting(false);
    },
    [validateForm, values]
  );

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    setValues: setFormValues,
    resetForm,
    handleSubmit,
  };
}

export default useForm;
