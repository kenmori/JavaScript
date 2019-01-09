import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/default.css";
import "../stylesheet/application.scss";
import App from "./components/App";

if (process.env.NODE_ENV !== "production") {
  const Immutable = require("immutable");
  const installDevTools = require("immutable-devtools");
  installDevTools(Immutable);
}

render(<App />, document.getElementById("root"));
