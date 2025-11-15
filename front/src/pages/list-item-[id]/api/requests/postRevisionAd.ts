import { api } from "@/shared/utils";

interface IPostRevisionAdByIdResponse extends BaseResponse {}

export interface IPostRevisionAdByIdParams {
  id: string;
  reason: string;
  comment?: string;
}

export type TPostRevisionAdByIdConfig = RequestConfig<IPostRevisionAdByIdParams>;

export const postRevisionAd = async ({
  params: { id, ...params },
  config
}: TPostRevisionAdByIdConfig) =>
  api.post<IPostRevisionAdByIdResponse>(`/ads/${id}/request-changes`, params, config);
