import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useIntl } from "react-intl";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { Grid, Card } from "@material-ui/core";
import { FormField } from "components/common";
import { Link } from "react-router-dom";
import { Button } from "bricks";

// Actions
import { login } from "redux/user/actions";

// Types
import { ILoginActionPayload } from "redux/user/types";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 14rem);
`;

const StyledLoginFormWrapper = styled(Card)`
  padding: 3.5rem 5rem;
  width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 100%;
    padding: 2rem;
    top: -3.3rem;
    left: 0;
    height: calc(100vh - 6rem);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: none;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.small};
  text-transform: capitalize;
  font-weight: bolder;
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 3.5rem;
  }
`;

const StyledRegisterText = styled.span`
  font-size: ${({ theme }) => theme.text.fontSize.small};
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  margin-bottom: 1.2rem;
  margin-left: auto;
`;

interface ILoginFormValues {
  email: string;
  password: string;
}

interface ILoginFormProps extends ILoginFormValues {
  login: (
    email: string,
    password: string
  ) => { type: string; payload: ILoginActionPayload };
}

const LoginPage = (props: ILoginFormProps & FormikProps<ILoginFormValues>) => {
  const { touched, errors, isSubmitting, values, handleSubmit } = props;
  const intl = useIntl();

  return (
    <StyledFormWrapper container>
      <StyledLoginFormWrapper>
        <Form>
          {touched.email && errors.email && <div>{errors.email}</div>}
          <StyledFieldWrapper>
            <Field
              name="email"
              type="email"
              label="email"
              placeholder="Type your password password"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper>
            <Field
              component={FormField}
              name="password"
              type="password"
              value={values.password}
              label="Password"
              placeholder="Type your password password"
            />
          </StyledFieldWrapper>

          <Grid container justify="space-between">
            <StyledButton type="submit" disabled={isSubmitting}>
              {intl.formatMessage({
                id: "Auth.login",
                defaultMessage: "Login"
              })}
            </StyledButton>

            <Grid container alignContent="space-between">
              <StyledLink to="/password-reset">
                {intl.formatMessage({
                  id: "Auth.passwordReset",
                  defaultMessage: "Password reset"
                })}
              </StyledLink>

              <StyledRegisterText>
                New User?{" "}
                <StyledLink to="/register-user">
                  {intl.formatMessage({
                    id: "Auth.register",
                    defaultMessage: "Register"
                  })}
                </StyledLink>
              </StyledRegisterText>
            </Grid>
          </Grid>
        </Form>
      </StyledLoginFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikLoginPage = withFormik<ILoginFormProps, ILoginFormValues>({
  displayName: "Login form",
  handleSubmit(values, { props, setSubmitting }) {
    props.login(values.email, values.password);
    setSubmitting(false);
  },
  mapPropsToValues(props) {
    return {
      email: props.email || "",
      password: props.password || ""
    };
  }
})(LoginPage);

export default connect(
  null,
  { login }
)(WithFormikLoginPage);
