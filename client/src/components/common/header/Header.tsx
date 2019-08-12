import React from "react";
import styled from "styled-components";

// Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

// Components
import { Grid } from "@material-ui/core";
import { AppMenu } from "components/common";

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
`;

const ToolTipWrapper = styled(Grid)`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Typography variant="h4" noWrap>
          LocalEvents
        </Typography>

        <AppMenu />

        <ToolTipWrapper>
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </ToolTipWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
