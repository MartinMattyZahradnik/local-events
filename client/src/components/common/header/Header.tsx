import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";

// Components
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import HeaderUser from "./HeaderUser";
import LanguageSelector from "./LanguageSelector";
import { Button } from "bricks";

// Actions
import { pushNotificationToStack } from "redux/notifications/actions";

// Selectors
import { selectIsUserLoggedIn } from "redux/user/selectors";

// Other
import { history } from "App";

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
  &${Button} {
    margin: 0 2.5rem 0 auto;
  }
`;

const Header = () => {
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
        <Link to="/">
          <Logo variant="h1">
            <StyledLogoLocal>Local</StyledLogoLocal>
            <StyledLogoEvents>Events</StyledLogoEvents>
          </Logo>
        </Link>

        <StyledCreateEventButton onClick={handleCreateEventClick}>
          <FormattedMessage id="Event.create" defaultMessage="Create Event" />
        </StyledCreateEventButton>

        <LanguageSelector />

        <HeaderUser />
      </StyledToolBar>
    </StyledAppBar>
  );
};

export default Header;
