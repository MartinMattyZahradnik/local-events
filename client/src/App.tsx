import React from "react";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";

import { GlobalStyle, Button } from "./bricks/index";

const theme = {
  primary: "red",
  secondary: "green"
};

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <div className="App">
            <header className="App-header">
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </React.Fragment>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
