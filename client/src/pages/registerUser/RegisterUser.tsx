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
import { IUserFormValues } from "redux/user/types";

const StyledFormWrapper = styled(Grid)`
  width: 80rem;
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: 0 3.5rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0;
    height: auto;
  }
`;

const emptyUser = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  birthDate: new Date(),
  password: "",
  passwordConfirm: "",
  image: "",
  gender: "male",
  address: {
    street: "",
    postalCode: "",
    city: "",
    country: ""
  }
};

const RegisterUser: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleSubmit = (values: IUserFormValues) => {
    dispatch(registerUser(values));
  };

  const submitButtonLabel = intl.formatMessage({
    id: "Auth.register",
    defaultMessage: "Register"
  });

  return (
    <StyledFormWrapper container>
      <UserForm
        {...emptyUser}
        onSubmit={handleSubmit}
        submitButtonLabel={submitButtonLabel}
        formHeading={intl.formatMessage({
          id: "User.register",
          defaultMessage: "Register user"
        })}
      />
    </StyledFormWrapper>
  );
};

export default RegisterUser;
