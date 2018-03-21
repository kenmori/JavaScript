import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';
import rootSaga from '../sagas/index';
import { GA } from './ReactGAMiddleware';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, GA];
  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require(`redux-logger`);
    const logger = createLogger({
      duration: true,
      timestamp: false,
    });
    middlewares.push(logger);
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middlewares),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
