import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import { updateSearchParams } from "@/shared/utils";

import { useGetAdsQuery } from "../api";

export const useListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = updateSearchParams(searchParams, setSearchParams);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { data, isPending } = useGetAdsQuery({
    page: searchParams.get("page") || "1",
    search: searchParams.get("search"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    categoryId: searchParams.get("categoryId"),
    status: searchParams.get("statuses")?.split(","),
    sortBy: searchParams.get("sortBy"),
    limit: searchParams.get("limit")
  });

  const onLimitChange = (limit: string) => {
    updateParams({ limit: limit });
  };

  const onPageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return;
    }
    const key = event.code.toLowerCase();

    if (key === "slash") {
      event.preventDefault();
      searchInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      searchInputRef.current.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return {
    state: { adsQueryState: { data, isPending }, searchInputRef },
    functions: { onPageChange, onLimitChange }
  };
};
