import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components

import { Grid } from "@material-ui/core";
import { UserForm } from "components";

// Actions
import { registerUser } from "redux/user/actions";

// Types

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
`;

const RegisterUser: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(registerUser(values));
  };

  return (
    <StyledFormWrapper container>
      <UserForm onSubmit={handleSubmit} />
    </StyledFormWrapper>
  );
};

export default RegisterUser;