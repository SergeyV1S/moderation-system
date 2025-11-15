import { useMutation } from "@tanstack/react-query";

import type { TPostApproveAdByIdConfig } from "../requests/postApproveAd";
import { postApproveAd } from "../requests/postApproveAd";

export const usePostApproveAdMutation = (
  settings?: MutationSettings<TPostApproveAdByIdConfig, typeof postApproveAd>
) =>
  useMutation({
    mutationKey: ["postApproveAd"],
    mutationFn: ({ params, config }) =>
      postApproveAd({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
