import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import { Header } from "components/common";
import Routes from "./Routes";

// Actions
import { fetchUser } from "actions/userActions";

const StyledApp = styled.div`
  margin-top: 6.4rem;
  padding-top: 2.5rem;
`;

const StyledAppWrapper = styled.div`
  max-width: 120rem;
  margin: auto;
`;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  });

  return (
    <StyledApp>
      <Header />
      <StyledAppWrapper>
        <Routes />
      </StyledAppWrapper>
    </StyledApp>
  );
};

export default App;
