import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { history } from "App";
import { request } from "utils/request";

// Components
import { Menu, MenuItem } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

// Actions
import { logout } from "redux/user/actions";

// Selectors
import { selectUser, selectUserImage } from "redux/user/selectors";

const StyledLogoutLink = styled.span`
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  color: white;
  text-transform: uppercase;
`;

const StyledUserAvatar = styled.div<any>`
  width: 4rem;
  height: 4rem;
  background: ${({ image }) => `url(${image}) center`};
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const StyledMenuLink = styled(Link)`
  color: inherit;
  text-transform: uppercase;
  font-size: inherit;
`;

const HeaderUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userImage = useSelector(selectUserImage);
  const { formatMessage } = useIntl();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    sessionStorage.removeItem("jwtToken");
    delete request.defaults.headers.Authorization;
    history.push("/login");
  };

  if (!user) {
    return (
      <>
        <StyledLink to="/login">
          {formatMessage({
            id: "General.login",
            defaultMessage: "Login"
          })}
        </StyledLink>

        <span style={{ margin: "0 0.5rem" }}> / </span>

        <StyledLink to="/register-user">
          {formatMessage({
            id: "General.register",
            defaultMessage: "Register"
          })}
        </StyledLink>
      </>
    );
  }

  return (
    <>
      <StyledUserAvatar image={userImage} onClick={handleClick} />

      <Menu
        id="user-menu"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleClose}>
          <StyledMenuLink to={`/user/${user._id}/profile`}>
            <FormattedMessage id="User.profile" defaultMessage="User profile" />
          </StyledMenuLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <StyledLogoutLink>
            <FormattedMessage id="General.logout" defaultMessage="Logout" />
          </StyledLogoutLink>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUser;
