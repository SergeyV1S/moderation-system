import { useMutation } from "@tanstack/react-query";

import type { TPostRevisionAdByIdConfig } from "../requests/postRevisionAd";
import { postRevisionAd } from "../requests/postRevisionAd";

export const usePostRevisionAdMutation = (
  settings?: MutationSettings<TPostRevisionAdByIdConfig, typeof postRevisionAd>
) =>
  useMutation({
    mutationKey: ["postRevisionAd"],
    mutationFn: ({ params, config }) =>
      postRevisionAd({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
