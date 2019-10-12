import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { history } from "App";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { FormField, FormSelect, FormDatePiker } from "components/common";
import { Button } from "bricks";
import { Card, Grid } from "@material-ui/core";

// Types
import { IRegisterUserActionPayload } from "redux/user/types";

const StyledRegisterUserWrapper = styled(Card)`
  width: 80rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  padding: 1.2rem 2rem 0 2rem;
  display: flex;
  align-items: flex-end;
  height: 4.5rem;
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

const StyledLink = styled.span`
  display: inline-block;
  color: #8c7b6b;
  font-size: 1.2rem;
  text-transform: capitalize;
  font-weight: bolder;
  cursor: pointer;
  margin-top: auto;
`;

const StyledUploadBtn = styled(Button)`
  margin-top: 0.8rem;
  font-size: 14px;
  width: 20rem;
`;

const StyledForm = styled(Form)`
  padding: 3.5rem;
`;

const StyledFormHeader = styled.div`
  height: 5.5rem;
  background-color: ${({ theme }) => theme.color.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 6px;
`;

const StyledFormFooter = styled(Grid)`
  padding: 0 2rem;
`;

interface IUserFormValues extends IRegisterUserActionPayload {}

interface IRegisterUserProps extends IUserFormValues {
  onSubmit: (formValues: IRegisterUserActionPayload) => any;
  submitButtonLabel: string;
  formHeading: string;
}

const UserForm = (props: IRegisterUserProps & FormikProps<IUserFormValues>) => {
  const { isSubmitting, setFieldValue, formHeading } = props;
  const { formatMessage } = useIntl();

  return (
    <StyledRegisterUserWrapper>
      <StyledFormHeader>
        <h2>{formHeading}</h2>
      </StyledFormHeader>
      <StyledForm>
        <Grid container>
          <StyledHeading>
            {formatMessage({
              id: "User.info",
              defaultMessage: "User Info"
            })}
          </StyledHeading>
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

          <StyledFieldWrapper>
            <input
              id="userImage"
              onChange={(event: any) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              type="file"
              name="image"
              hidden
            />
            <StyledUploadBtn>
              <label htmlFor="userImage">
                {formatMessage({
                  id: "User.uploadPhoto",
                  defaultMessage: "Upload photo"
                })}
              </label>
            </StyledUploadBtn>
          </StyledFieldWrapper>

          <StyledHeading>
            {formatMessage({
              id: "User.address",
              defaultMessage: "Address"
            })}
          </StyledHeading>

          <StyledFieldWrapper item xs={4}>
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
              name="address.city"
              type="text"
              label="City"
              placeholder="Type City"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={2}>
            <Field
              name="address.postalCode"
              type="text"
              label="Zip Code"
              placeholder="Type Zip Code"
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

        <StyledFormFooter container>
          <StyledLink onClick={history.goBack}>
            {" "}
            {formatMessage({
              id: "General.back",
              defaultMessage: "Back"
            })}
          </StyledLink>
          <StyledButton type="submit" disabled={isSubmitting}>
            {props.submitButtonLabel}
          </StyledButton>
        </StyledFormFooter>
      </StyledForm>
    </StyledRegisterUserWrapper>
  );
};

export default withFormik<IRegisterUserProps, IRegisterUserActionPayload>({
  displayName: "User form",
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
    password,
    image
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
      password,
      image
    };
  }
})(UserForm);
