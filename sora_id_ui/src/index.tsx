/* @refresh reload */
import { render } from 'solid-js/web'
import 'bootstrap/scss/bootstrap.scss';
import { Router } from "@solidjs/router";
import { routes } from "@/routers/routes";

const root = document.getElementById('root')

render(() => <Router>{routes}</Router>, root!)
