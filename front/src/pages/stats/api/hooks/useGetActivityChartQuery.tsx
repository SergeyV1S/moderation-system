import { useSuspenseQuery } from "@tanstack/react-query";

import type { IGetActivityChartParams } from "../requests/getActivityChart";
import { getActivityChart } from "../requests/getActivityChart";

export const useGetActivityChartQuery = (
  params: IGetActivityChartParams,
  settings?: QuerySettings<typeof getActivityChart>
) =>
  useSuspenseQuery({
    queryKey: ["getActivityChart", settings?.config, params],
    queryFn: () => getActivityChart({ params, config: settings?.config }),
    ...settings?.options
  });
