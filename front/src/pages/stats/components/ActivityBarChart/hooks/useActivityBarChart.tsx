import { useSearchParams } from "react-router";

import { useGetActivityChartQuery } from "@/pages/stats/api";
import { AD_STATUS } from "@/shared/constants";

export const useActivityBarChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetActivityChartQuery({
    period: searchParams.get("period") as Period,
    startDate: +searchParams.get("startDate") ? +searchParams.get("startDate") : undefined,
    endDate: +searchParams.get("endDate") ? +searchParams.get("endDate") : undefined
  });

  const barChartData = data.data.map((barData) => ({
    date: barData.date.split("-").reverse().join("."),
    [AD_STATUS["approved"]]: barData.approved,
    [AD_STATUS["rejected"]]: barData.rejected,
    [AD_STATUS["requestChanges"]]: barData.requestChanges,
    [AD_STATUS["draft"]]: barData.draft
  }));

  return { state: { barChartData } };
};
