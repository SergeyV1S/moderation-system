import { RouterProvider } from "react-router";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";
import { queryClient } from "./shared/constants";
import { OfflineProvider } from "./shared/offline-mode/OfflineProvider";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <OfflineProvider>
        <RouterProvider router={router} />
        <Notifications position='top-center' autoClose={2000} />
      </OfflineProvider>
    </MantineProvider>
  </QueryClientProvider>
);
