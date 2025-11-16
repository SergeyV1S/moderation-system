import { RouterProvider } from "react-router";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";
import { queryClient } from "./shared/constants";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <RouterProvider router={router} />
      <Notifications autoClose={2000} />
    </MantineProvider>
  </QueryClientProvider>
);
