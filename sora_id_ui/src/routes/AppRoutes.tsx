import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

import LoaderView from "@/routes/LoaderView";

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoaderView />}>
      <Switch>
        <Route path="/" component={lazy(() => import("@/pages/HomeView"))} />
        <Route
          path="/login"
          component={lazy(() => import("@/pages/LoginView"))}
        />
        <Route
          path="/cu/password/change"
          component={lazy(() => import("@/pages/ChangePasswordView"))}
        />
        <Route
          path="/cu"
          component={lazy(() => import("@/pages/UserInfoView"))}
        />
        <Route>404 Not Found</Route>
      </Switch>
    </Suspense>
  );
}
