import React from "react";
import styled from "styled-components";

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 7.5%;
`;

const StyledMenuItem = styled.li`
  padding: 0 1.6rem;
`;

const AppMenu = () => {
  return (
    <StyledMenu>
      <StyledMenuItem>Menu 1</StyledMenuItem>
      <StyledMenuItem>Menu 2</StyledMenuItem>
      <StyledMenuItem>Menu 3</StyledMenuItem>
    </StyledMenu>
  );
};

export default AppMenu;
