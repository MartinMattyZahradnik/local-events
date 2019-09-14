import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { FormField, FormSelect, FormDatePiker } from "components/common";
import { Button } from "bricks";
import { Card, Grid } from "@material-ui/core";

// Types
import { IRegisterUserActionPayload } from "redux/user/types";

const StyledRegisterUserWrapper = styled(Card)`
  padding: 5rem;
  width: 80rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  padding: 0 2rem;
`;

const StyledHeading = styled.h2`
  font-weight: bolder;
  text-transform: uppercase;
  margin: 1.5rem 0;
  padding-left: 2rem;
  width: 100%;
  text-align: left;
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

interface IUserFormValues extends IRegisterUserActionPayload {}

interface IRegisterUserProps extends IUserFormValues {
  onSubmit: (formValues: IRegisterUserActionPayload) => any;
}

const UserForm = (props: IRegisterUserProps & FormikProps<IUserFormValues>) => {
  const { isSubmitting, handleSubmit, setFieldValue } = props;
  const intl = useIntl();

  const handleFormSubmit = (e: any, values: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <StyledRegisterUserWrapper>
      <Form onSubmit={handleFormSubmit}>
        <Grid container>
          <StyledFieldWrapper item xs={6}>
            <Field
              name="userName"
              type="text"
              label="User Name"
              placeholder="Type User Name"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="firstName"
              type="text"
              label="First Name"
              placeholder="Type First Name"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Type Last Name"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="Type your email"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="phone"
              type="text"
              label="Phone"
              placeholder="Type your phone"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              name="birthDate"
              label="Birth Date"
              placeholder="Select your birth date"
              component={FormDatePiker}
              onChange={setFieldValue}
              disableFuture={true}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              name="gender"
              label="Gender"
              placeholder="Select gender"
              component={FormSelect}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" }
              ]}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="Type your password"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="passwordConfirm"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledHeading>Address</StyledHeading>

          <StyledFieldWrapper item xs={6}>
            <Field
              name="address.street"
              type="text"
              label="Street"
              placeholder="Type street"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              name="address.postalCode"
              type="text"
              label="Postal Code"
              placeholder="Type Postal Code"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              name="address.city"
              type="text"
              label="City"
              placeholder="Type City"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              name="address.country"
              label="Country"
              placeholder="Select country"
              component={FormSelect}
              options={[{ value: "US", label: "United States" }]}
            />
          </StyledFieldWrapper>
        </Grid>

        <Grid container>
          <StyledButton type="submit" disabled={isSubmitting}>
            {intl.formatMessage({
              id: "Auth.register",
              defaultMessage: "Register"
            })}
          </StyledButton>
        </Grid>
      </Form>
    </StyledRegisterUserWrapper>
  );
};

export default withFormik<IRegisterUserProps, IRegisterUserActionPayload>({
  displayName: "Login form",
  handleSubmit(values, { props, setSubmitting }) {
    props.onSubmit(values);
  },
  mapPropsToValues({
    userName,
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    address,
    gender,
    password
  }) {
    return {
      userName,
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      address,
      gender,
      password
    };
  }
})(UserForm);
