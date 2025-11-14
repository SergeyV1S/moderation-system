import { RouterProvider } from "react-router";

import { Container, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";
import { queryClient } from "./shared/constants";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <Container size='lg' py='xl'>
        <RouterProvider router={router} />
      </Container>
    </MantineProvider>
  </QueryClientProvider>
);
