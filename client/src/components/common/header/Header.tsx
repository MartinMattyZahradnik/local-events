import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import HeaderUser from "./HeaderUser";

// Selectors
import LanguageSelector from "./LanguageSelector";

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
  font-size: ${({ theme }) => theme.color.background};
`;

const StyledLanguageSelectorWrapper = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;s
`;

const Logo = styled(Typography)`
  text-transform: uppercase;
  font-size: 2.2rem;
  font-weight: bolder;
`;

const StyledLogoLocal = styled.span`
  margin-right: 0.8rem;
  color: white;
`;

const StyledLogoEvents = styled.span`
  padding: 0.2rem 0.6rem;
  background: white;
  color: ${({ theme }) => theme.color.primary};
`;

const StyledToolBar = styled(Toolbar)`
  width: 120rem;
  margin: auto;
  padding: 0;
`;

const Header = () => {
  return (
    <StyledAppBar>
      <StyledToolBar>
        <Link to="/">
          <Logo variant="h1">
            <StyledLogoLocal>Local</StyledLogoLocal>
            <StyledLogoEvents>Events</StyledLogoEvents>
          </Logo>
        </Link>

        <StyledLanguageSelectorWrapper>
          <LanguageSelector />
        </StyledLanguageSelectorWrapper>
        <HeaderUser />
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default Header;
