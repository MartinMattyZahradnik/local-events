import * as React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

// Components
import { Header } from "components/common";
import Routes from "./Routes";

// Actions
import { fetchUser } from "actions/userActions";
import { selectLocale } from "actions/localizationActions";
import locales, { availableLocales } from "localization";

const StyledApp = styled.div`
  margin-top: 6.4rem;
  padding-top: 2.5rem;
`;

const StyledAppWrapper = styled.div`
  max-width: 120rem;
  margin: auto;
`;

const App: React.FC = () => {
  const locale: availableLocales = useSelector(selectLocale);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  });

  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <StyledApp>
        <Header />
        <StyledAppWrapper>
          <Routes />
        </StyledAppWrapper>
      </StyledApp>
    </IntlProvider>
  );
};

export default App;
