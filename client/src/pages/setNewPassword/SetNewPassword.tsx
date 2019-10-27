import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import { history } from "App";
import qs from "qs";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { Grid, Card } from "@material-ui/core";
import { FormField, FormError } from "components/common";
import { Button } from "bricks";

// Actions
import { setNewPassword } from "redux/user/actions";

// Others
import validationSchema from "./SetNewPasswordValidationSchema";

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

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 3.5rem;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 1.2rem;
  margin-left: auto;
`;

interface ILoginFormValues {
  password: string;
  passwordConfirm: string;
}

type RouteParams = {
  location: string;
};

interface ILoginFormProps
  extends RouteComponentProps<RouteParams>,
    ILoginFormValues {
  setNewPassword: (password: string, token: string) => any;
  isValid: boolean;
}

const SetNewPasswordPage = (
  props: ILoginFormProps & FormikProps<ILoginFormValues>
) => {
  useEffect(() => {
    if (!props.location.search) {
      history.push("/");
    }
  }, [props.location.search]);
  const { touched, errors, isSubmitting, values } = props;
  const intl = useIntl();

  return (
    <StyledFormWrapper container>
      <StyledLoginFormWrapper>
        <StyledForm>
          <StyledFieldWrapper>
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="Type new password"
              component={FormField}
            />
            <FormError
              touched={touched.password}
              errorMsgId={errors.password}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper>
            <Field
              component={FormField}
              name="passwordConfirm"
              type="password"
              value={values.password}
              label="Confirm Password"
              placeholder="Confirm new  password"
            />
            <FormError
              touched={touched.passwordConfirm}
              errorMsgId={errors.passwordConfirm}
            />
          </StyledFieldWrapper>

          <Grid container justify="space-between">
            <StyledButton type="submit" disabled={isSubmitting}>
              {intl.formatMessage({
                id: "Auth.reset",
                defaultMessage: "Reset"
              })}
            </StyledButton>
          </Grid>
        </StyledForm>
      </StyledLoginFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikLoginPage = withFormik<ILoginFormProps, ILoginFormValues>({
  displayName: "Set New password form",
  validationSchema,
  handleSubmit(values, { props, setSubmitting }) {
    if (!props.isValid) {
      return;
    }

    const { token } = qs.parse(props.location.search.substr(1));
    props.setNewPassword(values.password, token);
    setSubmitting(false);
  },
  mapPropsToValues(props) {
    return {
      passwordConfirm: props.passwordConfirm || "",
      password: props.password || ""
    };
  }
})(SetNewPasswordPage);

export default connect(
  null,
  { setNewPassword }
)(WithFormikLoginPage);
