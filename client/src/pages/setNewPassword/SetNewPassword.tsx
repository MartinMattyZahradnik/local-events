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
import { FormField } from "components/common";
import { Button } from "bricks";

// Actions
import { setNewPassword } from "redux/user/actions";

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
  email: string;
  password: string;
}

type RouteParams = {
  location: string;
};

interface ILoginFormProps
  extends RouteComponentProps<RouteParams>,
    ILoginFormValues {
  setNewPassword: (password: string, token: string) => any;
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
        <Form>
          {touched.email && errors.email && <div>{errors.email}</div>}
          <StyledFieldWrapper>
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="Type new password"
              component={FormField}
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
          </StyledFieldWrapper>

          <Grid container justify="space-between">
            <StyledButton type="submit" disabled={isSubmitting}>
              {intl.formatMessage({
                id: "Auth.reset",
                defaultMessage: "Reset"
              })}
            </StyledButton>
          </Grid>
        </Form>
      </StyledLoginFormWrapper>
    </StyledFormWrapper>
  );
};

const WithFormikLoginPage = withFormik<ILoginFormProps, ILoginFormValues>({
  displayName: "Set New password form",
  handleSubmit(values, { props, setSubmitting }) {
    const { token } = qs.parse(props.location.search.substr(1));
    props.setNewPassword(values.password, token);
    setSubmitting(false);
  },
  mapPropsToValues(props) {
    return {
      email: props.email || "",
      password: props.password || ""
    };
  }
})(SetNewPasswordPage);

export default connect(
  null,
  { setNewPassword }
)(WithFormikLoginPage);
