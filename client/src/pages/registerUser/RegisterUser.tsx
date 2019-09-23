import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";

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
  const intl = useIntl();

  const handleSubmit = (values: any) => {
    dispatch(registerUser(values));
  };

  const submitButtonLabel = intl.formatMessage({
    id: "Auth.register",
    defaultMessage: "Register"
  });

  return (
    <StyledFormWrapper container>
      <UserForm onSubmit={handleSubmit} submitButtonLabel={submitButtonLabel} />
    </StyledFormWrapper>
  );
};

export default RegisterUser;
