import { api } from "@/shared/utils";

interface IGetSummaryStatsResponse {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface IGetSummaryStatsParams {
  period: Period;
  startDate: string;
  endDate: string;
}

export type TGetSummaryStatsConfig = RequestConfig<IGetSummaryStatsParams>;

export const getSummaryStats = async ({ params, config }: TGetSummaryStatsConfig) =>
  api.get<IGetSummaryStatsResponse>("/stats/summary", { params, ...config });
