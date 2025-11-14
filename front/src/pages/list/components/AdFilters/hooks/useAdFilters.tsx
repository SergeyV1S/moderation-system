import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { updateSearchParams } from "@/shared/utils";

export const useAdFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = updateSearchParams(searchParams, setSearchParams);

  const defaultParams = useMemo(
    () => ({
      statuses: searchParams.get("statuses")?.split(",") || [],
      categoryId: searchParams.get("categoryId") || "",
      minPrice: +searchParams.get("minPrice") || 0,
      maxPrice: +searchParams.get("maxPrice") || 0,
      sortBy: searchParams.get("sortBy") || ""
    }),
    [searchParams]
  );

  const [filters, setFilters] = useState(defaultParams);

  useEffect(() => {
    setFilters(defaultParams);
  }, [defaultParams]);

  const handleStatusChange = (values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      statuses: values
    }));
  };

  const handleSortByChange = (value: string | null) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const handleCategoryChange = (value: string | null) => {
    setFilters((prev) => ({ ...prev, categoryId: value }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("statuses");
    params.delete("categoryId");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("sortBy");

    setSearchParams(params);
  };

  const saveFilters = () => {
    updateParams({
      ...filters,
      minPrice: filters.minPrice ? filters.minPrice.toString() : "",
      maxPrice: filters.maxPrice ? filters.maxPrice.toString() : "",
      statuses: filters.statuses?.join(",") || ""
    });
  };

  return {
    state: { filters },
    functions: {
      handleCategoryChange,
      handleStatusChange,
      handlePriceChange,
      handleSortByChange,
      resetFilters,
      saveFilters
    }
  };
};
