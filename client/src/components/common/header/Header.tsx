import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";

// Components
import { AppBar, Toolbar, Typography, Grid, Collapse } from "@material-ui/core";
import { Button } from "bricks";
import HeaderUser from "./HeaderUser";
import LanguageSelector from "./LanguageSelector";
import Search from "./Search";
import CitySelector from "./CitySelector";

// Actions
import { pushNotificationToStack } from "redux/notifications/actions";

// Selectors
import { selectIsUserLoggedIn } from "redux/user/selectors";

// Other
import { history } from "App";
import MenuIcon from "@material-ui/icons/Menu";

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.background};
`;

const Logo = styled(Typography)`
  text-transform: uppercase;
  font-size: 2.2rem;
  font-weight: bolder;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 1.6rem;
  }
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
  max-width: 128rem;
  width: 100%;
  margin: auto;
  padding: 0;

  @media screen and (min-width: 1280px) {
    padding: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 3.5rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0 2rem;
  }
`;

const StyledCreateEventButton = styled(Button)`
  margin-right: 1.5rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: none;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: auto;
  }
`;

const StyledLanguageSelectorWrapper = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-left: auto;
  }
`;

const StyledSearchWrapper = styled.div`
  margin: 0 2.5rem 0 auto;
  width: 17rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledCitySelectorWrapper = styled.div`
  margin-left: 2rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledMobileCitySelectorWrapper = styled.div`
  .MuiInputBase-root {
    width: 100%;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 30%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
  }
`;

const StyledMobileSubmenu = styled(Grid)`
  display: none;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    padding: 0 3.5rem;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    flex-direction: column;
    padding: 0 2rem;
    align-items: normal;
  }
`;

const StyledMobileCreateEventButton = styled(StyledCreateEventButton)`
  display: none;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: block;
    margin: 0 0 1.5rem 0;
  }
`;

const MobileSearchWrapper = styled.div`
  margin: 1.5rem 0;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 65%;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  width: 2.5rem;
  height: 2.5rem;
  padding-bottom: 0.2rem;
  margin-right: 0.5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const { formatMessage } = useIntl();

  const handleCreateEventClick = () => {
    if (isUserLoggedIn) {
      return history.push("/create-event");
    }

    dispatch(
      pushNotificationToStack(
        formatMessage({
          id: "Event.create.loginRequired",
          defaultMessage: "You must be logged in to create an event"
        })
      )
    );
    history.push("/login");
  };

  return (
    <StyledAppBar>
      <StyledToolBar>
        <StyledMenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <Link to="/">
          <Logo variant="h1">
            <StyledLogoLocal>Local</StyledLogoLocal>
            <StyledLogoEvents>Events</StyledLogoEvents>
          </Logo>
        </Link>

        <StyledCitySelectorWrapper>
          <CitySelector />
        </StyledCitySelectorWrapper>

        <StyledSearchWrapper>
          <Search />
        </StyledSearchWrapper>

        <StyledCreateEventButton onClick={handleCreateEventClick}>
          <FormattedMessage id="Event.create" defaultMessage="Create Event" />
        </StyledCreateEventButton>

        <StyledLanguageSelectorWrapper>
          <LanguageSelector />
        </StyledLanguageSelectorWrapper>

        <HeaderUser />
      </StyledToolBar>

      <Collapse in={isMenuOpen}>
        <StyledMobileSubmenu
          container
          direction="column"
          justify="space-between"
        >
          <StyledMobileCitySelectorWrapper>
            <CitySelector />
          </StyledMobileCitySelectorWrapper>

          <MobileSearchWrapper>
            <Search />
          </MobileSearchWrapper>
          <StyledMobileCreateEventButton onClick={handleCreateEventClick}>
            <FormattedMessage id="Event.create" defaultMessage="Create Event" />
          </StyledMobileCreateEventButton>
        </StyledMobileSubmenu>
      </Collapse>
    </StyledAppBar>
  );
};

export default Header;
