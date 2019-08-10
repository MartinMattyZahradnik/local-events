import React from "react";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import configureStore from "store/store";

// Components
import { GlobalStyle, theme, Button } from "bricks/index";
import { Header } from "components/common";

const { store } = configureStore();

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <React.Fragment>
            <GlobalStyle />
            <div className="App">
              <Header />
              <header className="App-header">
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <Button>Pokustek</Button>
              </header>
            </div>
          </React.Fragment>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
