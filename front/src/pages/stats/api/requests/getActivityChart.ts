import { api } from "@/shared/utils";

interface IGetActivityChartResponse {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
  draft: number;
}

export interface IGetActivityChartParams {
  period: Period;
  startDate: number;
  endDate: number;
}

export type TGetActivityChartConfig = RequestConfig<IGetActivityChartParams>;

export const getActivityChart = async ({ params, config }: TGetActivityChartConfig) =>
  api.get<IGetActivityChartResponse[]>("/stats/chart/activity", { params, ...config });
