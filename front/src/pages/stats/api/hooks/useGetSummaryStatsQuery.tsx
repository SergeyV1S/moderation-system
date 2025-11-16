import { useSuspenseQuery } from "@tanstack/react-query";

import type { IGetSummaryStatsParams } from "../requests/getSummaryStats";
import { getSummaryStats } from "../requests/getSummaryStats";

export const useGetSummaryStatsQuery = (
  params: IGetSummaryStatsParams,
  settings?: QuerySettings<typeof getSummaryStats>
) =>
  useSuspenseQuery({
    queryKey: ["getSummaryStats", settings?.config, params],
    queryFn: () => getSummaryStats({ params, config: settings?.config }),
    ...settings?.options
  });
