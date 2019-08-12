import * as React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import configureStore from "store/store";

// Components
import App from "./App";
import { GlobalStyle, theme } from "bricks/index";

const { store } = configureStore();

const AppWrapper: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <React.Fragment>
            <GlobalStyle />
            <App />
          </React.Fragment>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
