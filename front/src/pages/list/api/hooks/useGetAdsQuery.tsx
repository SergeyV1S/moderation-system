import { useQuery } from "@tanstack/react-query";

import type { IGetAllAdsParams } from "../requests/getAllAds";
import { getAllAds } from "../requests/getAllAds";

export const useGetAdsQuery = (
  params: IGetAllAdsParams,
  settings?: QuerySettings<typeof getAllAds>
) =>
  useQuery({
    queryKey: ["getAllAds", settings?.config, params],
    queryFn: () => getAllAds({ params, config: settings?.config }),
    ...settings?.options
  });
