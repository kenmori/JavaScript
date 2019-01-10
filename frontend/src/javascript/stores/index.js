import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import rootSaga from "../sagas";

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
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return store;
}
