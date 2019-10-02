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
import { passwordReset } from "redux/user/actions";

// Types
import { IPasswordResetActionPayload } from "redux/user/types";

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 3.5rem;
  }
`;

const StyledBackLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.small};
  font-weight: bolder;
  margin-top: auto;
`;

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledLoginFormWrapper = styled(Card)`
  padding: 3.5rem 5rem;
  width: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
`;

interface IPasswordResetFormValues {
  email: string;
}

interface IPasswordResetFormProps extends IPasswordResetFormValues {
  passwordReset: (
    email: string
  ) => { payload: IPasswordResetActionPayload; type: string };
}

const PasswordReset = (
  props: IPasswordResetFormProps & FormikProps<IPasswordResetFormValues>
) => {
  const { touched, errors, isSubmitting } = props;
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
              placeholder="Type your email"
              component={FormField}
            />
          </StyledFieldWrapper>

          <Grid container justify="space-between">
            <StyledBackLink to="/login">
              {intl.formatMessage({
                id: "Auth.backToLogin",
                defaultMessage: "Back to login"
              })}
            </StyledBackLink>

            <Button type="submit" disabled={isSubmitting}>
              {intl.formatMessage({
                id: "General.submit",
                defaultMessage: "Submit"
              })}
            </Button>
          </Grid>
        </Form>
      </StyledLoginFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikPasswordResetPage = withFormik<
  IPasswordResetFormProps,
  IPasswordResetFormValues
>({
  displayName: "Password reset form",
  handleSubmit(values, { props, setSubmitting }) {
    props.passwordReset(values.email);
    setSubmitting(false);
  },
  mapPropsToValues(props) {
    return {
      email: props.email || ""
    };
  }
})(PasswordReset);

export default connect(
  null,
  { passwordReset }
)(WithFormikPasswordResetPage);
