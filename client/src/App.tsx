import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

// Components
import { Header } from "components/common";
import Routes from "./Routes";
import { NotificationList } from "components";

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
history.listen(location => ReactGA.pageview(location.pathname));

const App: React.FC = () => {
  useEffect(() => {
    console.log(
      "process.env.REACT_APP_GA_TRACKING_ID",
      process.env.REACT_APP_GA_TRACKING_ID
    );
    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    }
  }, []);
  const locale: AvailableLocales = useSelector(selectLocale);

  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <Router history={history}>
        <StyledApp>
          <Header />
          <Routes />
        </StyledApp>
      </Router>
      <div id="modal-root" />
      <NotificationList />
    </IntlProvider>
  );
};

export default App;
