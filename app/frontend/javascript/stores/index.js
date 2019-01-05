import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers/index";
import rootSaga from "../sagas/index";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  let store;
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    store = createStore(
      reducers,
      composeWithDevTools(applyMiddleware(...middlewares)),
    );
  } else {
    store = createStore(reducers, applyMiddleware(...middlewares));
  }

  sagaMiddleware.run(rootSaga);
  return store;
}
