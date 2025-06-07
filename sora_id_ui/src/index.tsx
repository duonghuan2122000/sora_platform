/* @refresh reload */
import { render } from "solid-js/web";
import "@/assets/scss/bootstrap.scss";
// import "bootstrap/scss/bootstrap.scss";
import { Router } from "@solidjs/router";
import { routes } from "@/routers/routes";

const root = document.getElementById("root");

const basePath = window._appConfig?.basePath;

render(() => <Router base={basePath}>{routes}</Router>, root!);
