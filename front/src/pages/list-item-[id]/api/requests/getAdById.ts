import { api } from "@/shared/utils";

interface IGetAdByIdResponse extends Ad {}

export interface IGetAdByIdParams {
  id: string;
}

export type TGetAdByIdConfig = RequestConfig<IGetAdByIdParams>;

export const getAdById = async ({ params, config }: TGetAdByIdConfig) =>
  api.get<IGetAdByIdResponse>(`/ads/${params.id}`, config);
