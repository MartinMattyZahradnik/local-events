import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { history } from "App";

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

const StyledUserAvatar = styled.div<any>`
  width: 4rem;
  height: 4rem;
  background: ${({ image }) => `url(${image}) center`};
  background-size: contain;
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

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return <Link to="/login">Login</Link>;
  }

  return (
    <>
      <StyledUserAvatar image={user.image} onClick={handleClick} />

      <Menu
        id="user-menu"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <StyledMenuLink to={`/user/${user._id}/profile`}>
            <FormattedMessage id="User.profile" defaultMessage="User profile" />
          </StyledMenuLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledLogoutLink onClick={handleLogout}>Logout</StyledLogoutLink>
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUser;
