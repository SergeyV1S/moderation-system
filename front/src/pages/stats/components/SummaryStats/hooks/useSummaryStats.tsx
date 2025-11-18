import { useSearchParams } from "react-router";

import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconEye,
  IconTrendingUp,
  IconX
} from "@tabler/icons-react";

import { useGetSummaryStatsQuery } from "@/pages/stats/api";
import { formatDateParam, formatDuration } from "@/shared/utils";

export const useSummaryStats = () => {
  const [searchParams] = useSearchParams();
  const { data } = useGetSummaryStatsQuery({
    period: searchParams.get("period") as Period,
    startDate: formatDateParam(searchParams, "startDate"),
    endDate: formatDateParam(searchParams, "endDate")
  });

  const stats = data.data;

  const statCards = [
    {
      label: "Всего проверено",
      value: stats.totalReviewed,
      icon: IconEye,
      color: "blue"
    },
    {
      label: "Проверено сегодня",
      value: stats.totalReviewedToday,
      icon: IconCalendar,
      color: "green"
    },
    {
      label: "Среднее время",
      value: formatDuration(stats.averageReviewTime),
      icon: IconClock,
      color: "orange"
    },
    {
      label: "Одобрено",
      value: `${Math.round(stats.approvedPercentage * 10) / 10}%`,
      icon: IconCheck,
      color: "green"
    },
    {
      label: "Отклонено",
      value: `${Math.round(stats.rejectedPercentage * 10) / 10}%`,
      icon: IconX,
      color: "red"
    },
    {
      label: "На доработку",
      value: `${Math.round(stats.requestChangesPercentage * 10) / 10}%`,
      icon: IconTrendingUp,
      color: "blue"
    }
  ];

  return { state: { statCards } };
};
