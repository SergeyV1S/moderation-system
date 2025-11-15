import { useQuery } from "@tanstack/react-query";

import type { IGetAdByIdParams } from "../requests/getAdById";
import { getAdById } from "../requests/getAdById";

export const useGetAdByIdQuery = (
  params: IGetAdByIdParams,
  settings?: QuerySettings<typeof getAdById>
) =>
  useQuery({
    queryKey: ["getAdById", settings?.config, params],
    queryFn: () => getAdById({ params, config: settings?.config }),
    ...settings?.options
  });
