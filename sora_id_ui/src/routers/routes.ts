import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/HomePage")),
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/LoginPage")),
  },
];
