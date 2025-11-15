import { api } from "@/shared/utils";

interface IPostRejectAdByIdResponse extends BaseResponse {}

export interface IPostRejectAdByIdParams {
  id: string;
  reason: string;
  comment?: string;
}

export type TPostRejectAdByIdConfig = RequestConfig<IPostRejectAdByIdParams>;

export const postRejectAd = async ({
  params: { id, ...params },
  config
}: TPostRejectAdByIdConfig) =>
  api.post<IPostRejectAdByIdResponse>(`/ads/${id}/reject`, params, config);
