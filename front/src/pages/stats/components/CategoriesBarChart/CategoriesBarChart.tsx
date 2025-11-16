import { useSearchParams } from "react-router";

import { useGetCategoriesChartQuery } from "@/pages/stats/api";

export const CategoriesBarChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetCategoriesChartQuery({
    period: searchParams.get("period") as Period,
    startDate: +searchParams.get("startDate"),
    endDate: +searchParams.get("endDate")
  });

  return <div className=''>{data.data.Детское}</div>;
};
