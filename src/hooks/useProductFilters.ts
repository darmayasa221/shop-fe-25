import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ProductCategory, SortOption } from "../types/product";
import { FilterParams } from "../components/product/ProductFilter";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterParams>({});

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category") as ProductCategory | null;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const searchTerm = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") as SortOption | null;

    const newFilters: FilterParams = {};

    if (category) newFilters.category = category;
    if (minPrice) newFilters.minPrice = Number(minPrice);
    if (maxPrice) newFilters.maxPrice = Number(maxPrice);
    if (inStock === "true") newFilters.inStock = true;
    if (searchTerm) newFilters.searchTerm = searchTerm;
    if (sortBy) newFilters.sortBy = sortBy;

    setFilters(newFilters);
  }, [searchParams]);

  // Update URL params when filters change
  const updateFilters = (newFilters: FilterParams) => {
    const params = new URLSearchParams();

    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.minPrice)
      params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice)
      params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.inStock) params.set("inStock", "true");
    if (newFilters.searchTerm) params.set("search", newFilters.searchTerm);
    if (newFilters.sortBy) params.set("sortBy", newFilters.sortBy);

    setSearchParams(params);
    setFilters(newFilters);
  };

  return { filters, updateFilters };
};

export default useProductFilters;
