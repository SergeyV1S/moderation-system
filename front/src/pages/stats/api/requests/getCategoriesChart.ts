import { api } from "@/shared/utils";

interface IGetCategoriesChartResponse extends Record<Category, number> {}

export interface IGetCategoriesChartParams {
  period: Period;
  startDate: number;
  endDate: number;
}

export type TGetCategoriesChartConfig = RequestConfig<IGetCategoriesChartParams>;

export const getCategoriesChart = async ({ params, config }: TGetCategoriesChartConfig) =>
  api.get<IGetCategoriesChartResponse>("/stats/chart/categories", { params, ...config });
