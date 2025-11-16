import { useSuspenseQuery } from "@tanstack/react-query";

import type { IGetCategoriesChartParams } from "../requests/getCategoriesChart";
import { getCategoriesChart } from "../requests/getCategoriesChart";

export const useGetCategoriesChartQuery = (
  params: IGetCategoriesChartParams,
  settings?: QuerySettings<typeof getCategoriesChart>
) =>
  useSuspenseQuery({
    queryKey: ["getCategoriesChart", settings?.config, params],
    queryFn: () => getCategoriesChart({ params, config: settings?.config }),
    ...settings?.options
  });
