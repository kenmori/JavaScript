import React from "react";
import { Provider } from "react-redux";
import Router from "../routes";
import configureStore from "../stores/index";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
