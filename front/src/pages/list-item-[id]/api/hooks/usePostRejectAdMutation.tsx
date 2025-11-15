import { useMutation } from "@tanstack/react-query";

import type { TPostRejectAdByIdConfig } from "../requests/postRejectAd";
import { postRejectAd } from "../requests/postRejectAd";

export const usePostRejectAdMutation = (
  settings?: MutationSettings<TPostRejectAdByIdConfig, typeof postRejectAd>
) =>
  useMutation({
    mutationKey: ["postRejectAd"],
    mutationFn: ({ params, config }) =>
      postRejectAd({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
