import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import rootReducer, { initialState } from "redux/rootReducer";
import { createStore, compose, applyMiddleware, Middleware } from "redux";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import { StylesProvider } from "@material-ui/styles";
import { theme } from "bricks/index";
import locales from "localization";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];
const history = createMemoryHistory();

export function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(
      rootReducer,
      compose(applyMiddleware(...middlewares)),
      initialState
    )
  } = {}
) {
  sagaMiddleware.run(rootSaga);

  return {
    ...render(
      <IntlProvider locale="en" messages={locales.en}>
        <Router history={history}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Provider store={store}>{ui}</Provider>
            </ThemeProvider>
          </StylesProvider>
        </Router>
      </IntlProvider>
    ),
    store
  };
}
