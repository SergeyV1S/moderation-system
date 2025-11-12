import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";

import { PATHS } from "@/constants";
import { createRoute } from "@/utils";

const ListScreen = lazy(() => import("@/pages/list/page"));
const ListItemScreen = lazy(() => import("@/pages/list-item-[id]/page"));
const StatsScreen = lazy(() => import("@/pages/stats/page"));

const IndexRoute = createRoute(PATHS.INDEX, <Navigate to={PATHS.LIST} />);
const ListRoute = createRoute(PATHS.LIST, <ListScreen />);
const ListItemRoute = createRoute(PATHS.ITEM_ID, <ListItemScreen />);
const StatsRoute = createRoute(PATHS.STATS, <StatsScreen />);

export const router = createBrowserRouter([IndexRoute, ListRoute, ListItemRoute, StatsRoute]);
