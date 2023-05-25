import { createRoot } from "react-dom/client";
import moment from "moment";
import "moment/locale/ru";
import App from "./App";

const container = document.getElementById("app");
moment.locale("ru");
if (container) {
  const root = createRoot(container);
  root.render(App());
}
