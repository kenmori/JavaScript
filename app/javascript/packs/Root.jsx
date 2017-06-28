import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Home from "../components/Home";
import configureStore from "../stores/index";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.body.appendChild(document.createElement("div")),
  )
});
