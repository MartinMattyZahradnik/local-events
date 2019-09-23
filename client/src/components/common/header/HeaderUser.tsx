import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { history } from "App";

// Actions
import { logout } from "redux/user/actions";

// Selectors
import { selectUser } from "redux/user/selectors";

const StyledLogoutLink = styled.span`
  cursor: pointer;
  text-transform: uppercase;
`;

const HeaderUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  if (!user) {
    return <Link to="/login">Login</Link>;
  }

  return <StyledLogoutLink onClick={handleLogout}>Logout</StyledLogoutLink>;
};

export default HeaderUser;
