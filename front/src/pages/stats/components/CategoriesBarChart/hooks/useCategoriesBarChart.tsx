import { useSearchParams } from "react-router";

import { useGetCategoriesChartQuery } from "@/pages/stats/api";

export const useCategoriesBarChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetCategoriesChartQuery({
    period: searchParams.get("period") as Period,
    startDate: +searchParams.get("startDate") ? +searchParams.get("startDate") : undefined,
    endDate: +searchParams.get("endDate") ? +searchParams.get("endDate") : undefined
  });

  const barChartData = Object.entries(data.data).map((barData: [Category, number]) => ({
    category: barData[0],
    Количество: barData[1]
  }));

  return { state: { barChartData } };
};
