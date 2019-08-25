import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

// Components
import { Header } from "components/common";
import Routes from "./Routes";

// Actions
import { fetchUser } from "actions/userActions";
import { selectLocale } from "actions/localizationActions";
import locales, { availableLocales } from "localization";

const StyledApp = styled.div`
  margin-top: 6.4rem;
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.color.background};
`;

const StyledAppWrapper = styled.div`
  max-width: 120rem;
  margin: auto;
`;

export const history = createBrowserHistory();

const App: React.FC = () => {
  const locale: availableLocales = useSelector(selectLocale);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <Router history={history}>
        <StyledApp>
          <Header />
          <StyledAppWrapper>
            <Routes />
          </StyledAppWrapper>
        </StyledApp>
      </Router>
    </IntlProvider>
  );
};

export default App;
