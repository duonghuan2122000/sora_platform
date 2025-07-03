import { lazy } from "solid-js";
import { Route } from "@solidjs/router";
import { RouterConst } from "./RouterConst";

const RoutesConfig = () => {
  return (
    <>
      <Route
        path={RouterConst.SelectTenant}
        component={lazy(() => import("@/pages/SelectTenantPage"))}
      />
      <Route path="/" component={lazy(() => import("@/layouts/MainLayout"))}>
        <Route
          path={RouterConst.ListAppIntegration}
          component={lazy(() => import("@/pages/ListAppIntegrationPage"))}
        />
        <Route
          path={RouterConst.Home}
          component={lazy(() => import("@/pages/HomePage"))}
        ></Route>
      </Route>
      <Route
        path={RouterConst.Login}
        component={lazy(() => import("@/pages/LoginPage"))}
      />
    </>
  );
};

export default RoutesConfig;
