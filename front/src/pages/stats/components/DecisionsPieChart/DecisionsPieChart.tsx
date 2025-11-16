import { useSearchParams } from "react-router";

import { useGetDecisionsChartQuery } from "@/pages/stats/api";

export const DecisionsPieChart = () => {
  const [searchParams] = useSearchParams();

  const { data } = useGetDecisionsChartQuery({
    period: searchParams.get("period") as Period,
    startDate: +searchParams.get("startDate"),
    endDate: +searchParams.get("endDate")
  });

  return <div className=''>{data.data.approved}</div>;
};
