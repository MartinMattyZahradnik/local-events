import React from "react";
import styled from "styled-components";

// Components
import { CircularProgress, Grid } from "@material-ui/core";

const StyledLoading = styled(Grid)`
  height: calc(100vh - 7rem);
`;

const Loading = (): JSX.Element => {
  return (
    <StyledLoading
      data-testid="loading"
      container
      justify="center"
      alignContent="center"
    >
      <CircularProgress color="primary" />
    </StyledLoading>
  );
};

export default Loading;
