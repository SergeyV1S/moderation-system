import { api } from "@/shared/utils";

interface IGetDecisionsChartResponse {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface IGetDecisionsChartParams {
  period: Period;
  startDate: number;
  endDate: number;
}

export type TGetDecisionsChartConfig = RequestConfig<IGetDecisionsChartParams>;

export const getDecisionsChart = async ({ params, config }: TGetDecisionsChartConfig) =>
  api.get<IGetDecisionsChartResponse>("/stats/chart/decisions", { params, ...config });
