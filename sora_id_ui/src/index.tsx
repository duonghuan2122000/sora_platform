/* @refresh reload */
import { render } from "solid-js/web";
import "@/assets/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 👈 cần thiết cho dropdown hoạt động
import { Router } from "@solidjs/router";
import RoutesConfig from "@/routers/routes";

const root = document.getElementById("root");

const basePath = window._appConfig?.basePath;

render(
  () => (
    <Router base={basePath}>
      <RoutesConfig />
    </Router>
  ),
  root!
);
