import { lazy } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router";

import { Container, Stack } from "@mantine/core";

import { Header } from "@/shared/components";
import { PATHS } from "@/shared/constants";
import { createRoute } from "@/shared/utils";

const ListScreen = lazy(() => import("@/pages/list/page"));
const ListItemScreen = lazy(() => import("@/pages/list-item-[id]/page"));
const StatsScreen = lazy(() => import("@/pages/stats/page"));

const IndexRoute = createRoute(PATHS.INDEX, <Navigate to={PATHS.LIST} />);
const ListRoute = createRoute(PATHS.LIST, <ListScreen />);
const ListItemRoute = createRoute(PATHS.ITEM_ID, <ListItemScreen />);
const StatsRoute = createRoute(PATHS.STATS, <StatsScreen />);

export const router = createBrowserRouter([
  {
    element: (
      <Container size='lg' py={16}>
        <Stack gap={32}>
          <Header />
          <Outlet />
        </Stack>
      </Container>
    ),
    children: [IndexRoute, ListRoute, ListItemRoute, StatsRoute]
  }
]);
