import { useSearchParams } from "react-router";

import { useGetCategoriesChartQuery } from "@/pages/stats/api";
import { formatDateParam } from "@/shared/utils";

export const useCategoriesBarChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetCategoriesChartQuery({
    period: searchParams.get("period") as Period,
    startDate: formatDateParam(searchParams, "startDate"),
    endDate: formatDateParam(searchParams, "endDate")
  });

  const barChartData = Object.entries(data.data).map((barData: [Category, number]) => ({
    category: barData[0],
    Количество: barData[1]
  }));

  return { state: { barChartData } };
};
