import { useSuspenseQuery } from "@tanstack/react-query";

import type { IGetDecisionsChartParams } from "../requests/getDecisionsChart";
import { getDecisionsChart } from "../requests/getDecisionsChart";

export const useGetDecisionsChartQuery = (
  params: IGetDecisionsChartParams,
  settings?: QuerySettings<typeof getDecisionsChart>
) =>
  useSuspenseQuery({
    queryKey: ["getDecisionsChart", settings?.config, params],
    queryFn: () => getDecisionsChart({ params, config: settings?.config }),
    ...settings?.options
  });
