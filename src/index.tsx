/* @refresh reload */
import { render } from "solid-js/web";

import "virtual:windi-devtools";
import "virtual:windi.css";
import "./global.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
