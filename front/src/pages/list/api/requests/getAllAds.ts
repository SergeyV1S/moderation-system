import { api } from "@/shared/utils";

interface IGetAdsResponse {
  ads: Ad[];
  pagination: Pagination;
}

export interface IGetAllAdsParams {
  page: string;
  status: string | string[];
  minPrice: string;
  categoryId: string;
  maxPrice: string;
  search: string;
  sortBy: string;
}

export type TGetAllAdsConfig = RequestConfig<IGetAllAdsParams>;

export const getAllAds = async ({ params, config }: TGetAllAdsConfig) =>
  api.get<IGetAdsResponse>("/ads", { params, ...config });
