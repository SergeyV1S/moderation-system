import { api } from "@/shared/utils";

interface IPostApproveAdByIdResponse extends BaseResponse {}

export interface IPostApproveAdByIdParams {
  id: string;
}

export type TPostApproveAdByIdConfig = RequestConfig<IPostApproveAdByIdParams>;

export const postApproveAd = async ({
  params: { id, ...params },
  config
}: TPostApproveAdByIdConfig) =>
  api.post<IPostApproveAdByIdResponse>(`/ads/${id}/approve`, params, config);
