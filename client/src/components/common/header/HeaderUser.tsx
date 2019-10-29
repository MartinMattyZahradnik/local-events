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
import { selectUser } from "redux/user/selectors";

const StyledLogoutLink = styled.span`
  cursor: pointer;
  text-transform: uppercase;
`;

const StyledLoginLink = styled(Link)`
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
  const { formatMessage } = useIntl();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("jwtToken");
    delete request.defaults.headers.Authorization;
    history.push("/login");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <StyledLoginLink to="/login">
        {formatMessage({
          id: "General.login",
          defaultMessage: "Login"
        })}
      </StyledLoginLink>
    );
  }

  return (
    <>
      {/* @TODO - define API_BASE url in constants */}
      <StyledUserAvatar image={`/${user.image}`} onClick={handleClick} />

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
        <MenuItem onClick={handleClose}>
          <StyledLogoutLink onClick={handleLogout}>
            {formatMessage({
              id: "General.logout",
              defaultMessage: "Logout"
            })}
          </StyledLogoutLink>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUser;
