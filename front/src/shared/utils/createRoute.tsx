import { Suspense } from "react";
import type { JSX } from "react";
import type { RouteObject } from "react-router";

import { CustomLoader as Loader } from "../ui";

export const createRoute = (
  path: string,
  component: JSX.Element,
  config?: RouteObject
): RouteObject => ({
  path,
  element: <Suspense fallback={<Loader />}>{component}</Suspense>,
  errorElement: <div className=''>Error</div>,
  ...config
});
