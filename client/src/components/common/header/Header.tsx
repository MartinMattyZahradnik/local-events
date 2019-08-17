import React from "react";
import styled from "styled-components";

// Components
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { AppMenu } from "components/common";
import LanguageSelector from "./LanguageSelector";

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
`;

const ToolTipWrapper = styled(Grid)`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const StyledLanguageSelector = styled(LanguageSelector)`
  margin-left: auto;
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
        <StyledLanguageSelector />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
