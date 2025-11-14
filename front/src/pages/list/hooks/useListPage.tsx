import { useSearchParams } from "react-router";

import { useGetAdsQuery } from "../api";

export const useListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPending } = useGetAdsQuery({
    page: searchParams.get("page") || "1",
    search: searchParams.get("search"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    categoryId: searchParams.get("categoryId"),
    status: searchParams.get("statuses")?.split(","),
    sortBy: searchParams.get("sortBy")
  });

  const onPageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  return { state: { adsQueryState: { data, isPending } }, functions: { onPageChange } };
};
