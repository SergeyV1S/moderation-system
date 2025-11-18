import { useSearchParams } from "react-router";

import { useGetDecisionsChartQuery } from "@/pages/stats/api";
import { AD_STATUS, AD_STATUS_COLORS } from "@/shared/constants";
import { formatDateParam } from "@/shared/utils";

export const useDecisionsPieChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetDecisionsChartQuery({
    period: searchParams.get("period") as Period,
    startDate: formatDateParam(searchParams, "startDate"),
    endDate: formatDateParam(searchParams, "endDate")
  });

  const pieChartData = Object.entries(data.data).map((pieData: [AdStatus, number]) => ({
    name: AD_STATUS[pieData[0]],
    value: Math.round(pieData[1] * 10) / 10,
    color: AD_STATUS_COLORS[pieData[0]]
  }));

  return { state: { pieChartData } };
};
