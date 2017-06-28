import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';
import rootSaga from '../sagas/index';
import logger from 'redux-logger'

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};