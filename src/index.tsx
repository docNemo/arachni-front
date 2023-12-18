import React from "react";
import { createRoot } from "react-dom/client";
import moment from "moment";
import "moment/locale/ru";
import App from "./App";

moment.locale("ru");

const container = document.getElementById("app");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
