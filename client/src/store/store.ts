import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";

import rootReducer from "reducers/rootReducer";
import rootSaga from "sagas/rootSaga";

/**
 * Store Creator
 */
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: any = [sagaMiddleware];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
      collapsed: true
    });
    middlewares.push(logger);
  }

  const persistedReducer = persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: ["user", "auth"]
    },
    rootReducer
  );

  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  return { persistor, store };
}
