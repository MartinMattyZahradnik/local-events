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
`;

const StyledLoginFormWrapper = styled(Card)`
  padding: 5rem;
  width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
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
`;

interface ILoginFormValues {
  email: string;
  password: string;
}

interface ILoginFormProps extends ILoginFormValues {
  login: (email: string, password: string) => ILoginActionPayload;
}

const LoginPage = (props: ILoginFormProps & FormikProps<ILoginFormValues>) => {
  const { touched, errors, isSubmitting, values, handleSubmit } = props;
  const intl = useIntl();

  const handleFormSubmit = (e: any, values: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <StyledFormWrapper container>
      <StyledLoginFormWrapper>
        <Form onSubmit={handleFormSubmit}>
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
            <StyledLink to="/password-reset">
              {intl.formatMessage({
                id: "Auth.passwordReset",
                defaultMessage: "Password reset"
              })}
            </StyledLink>
            <>
              <StyledButton type="submit" disabled={isSubmitting}>
                {intl.formatMessage({
                  id: "Auth.login",
                  defaultMessage: "Login"
                })}
              </StyledButton>
              <StyledRegisterText>
                New User?{" "}
                <StyledLink to="/register-user">
                  {intl.formatMessage({
                    id: "Auth.register",
                    defaultMessage: "Register"
                  })}
                </StyledLink>
              </StyledRegisterText>
            </>
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
