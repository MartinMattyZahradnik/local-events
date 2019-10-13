import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

// Components
import { Header } from "components/common";
import Routes from "./Routes";

// Actions
import { selectLocale } from "redux/localization/actions";
import locales from "localization";
import { AvailableLocales } from "redux/localization/types";

const StyledApp = styled.div`
  padding: 9rem 0 4rem 0;
  background-color: ${({ theme }) => theme.color.background};
  max-width: 128rem;
  margin: auto;
`;

export const history = createBrowserHistory();

const App: React.FC = () => {
  const locale: AvailableLocales = useSelector(selectLocale);

  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <Router history={history}>
        <StyledApp>
          <Header />
          <Routes />
        </StyledApp>
      </Router>
    </IntlProvider>
  );
};

export default App;
