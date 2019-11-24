import React, { useEffect } from "react";
import styled from "styled-components";
import { useIntl, FormattedMessage } from "react-intl";
import { history } from "App";
import get from "lodash.get";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import {
  FormField,
  FormSelect,
  FormDatePiker,
  FormHeader,
  FormError
} from "components/common";
import { Button } from "bricks";
import { Card, Grid } from "@material-ui/core";

// Types
import { IRegisterUserActionPayload } from "redux/user/types";
import { ICountry } from "redux/application/types";

// Actions
import { fetchCountryList } from "redux/application/actions";

// Selectors
import { selectCountryList } from "redux/application/selectors";

// Others
import validationSchema from "./UserFormValidationSchema";

const StyledUserFormWrapper = styled(Card)`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    box-shadow: none;
  }
`;

const StyledForm = styled(Form)`
  padding: 3.5rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 2rem;
  }
`;

const StyledFieldWrapper = styled(Grid)`
  margin-bottom: 2rem;
  padding: 1.2rem 2rem 0 2rem;
  display: flex;
  align-items: flex-end;
  height: 4.5rem;
  position: relative;
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
  font-size: 1.4rem;
  width: 20rem;
`;

const StyledFormFooter = styled(Grid)`
  padding: 0 2rem;
`;

const StyledFormErrorWrapper = styled.div`
  position: absolute;
  top: -1.2rem;
  right: 2rem;
`;

interface IUserFormValues extends IRegisterUserActionPayload {}

interface IRegisterUserProps extends IUserFormValues {
  onSubmit: (formValues: IRegisterUserActionPayload) => any;
  submitButtonLabel: string;
  formHeading: string;
}

const UserForm = (props: IRegisterUserProps & FormikProps<IUserFormValues>) => {
  const { isSubmitting, setFieldValue, formHeading, touched, errors } = props;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const countries = useSelector(selectCountryList);
  useEffect(() => {
    dispatch(fetchCountryList());
  }, []);

  return (
    <StyledUserFormWrapper>
      <FormHeader formHeading={formHeading} />
      <StyledForm>
        <Grid container>
          <StyledHeading>
            {formatMessage({
              id: "User.info",
              defaultMessage: "User Info"
            })}
          </StyledHeading>
          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="userName"
              type="text"
              label={
                <FormattedMessage
                  id="User.userName"
                  defaultMessage="User name"
                />
              }
              placeholder={formatMessage({
                id: "User.typeUserName",
                defaultMessage: "Type user name"
              })}
              component={FormField}
            />
            <StyledFormErrorWrapper>
              <FormError
                touched={touched.userName}
                errorMsgId={errors.userName}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="firstName"
              type="text"
              label={
                <FormattedMessage
                  id="User.firstName"
                  defaultMessage="First name"
                />
              }
              placeholder={formatMessage({
                id: "User.typeFirstName",
                defaultMessage: "Type first name"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={touched.firstName}
                errorMsgId={errors.firstName}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="lastName"
              type="text"
              label={
                <FormattedMessage
                  id="User.lastName"
                  defaultMessage="Last name"
                />
              }
              placeholder={formatMessage({
                id: "User.typeLastName",
                defaultMessage: "Type last name"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={touched.lastName}
                errorMsgId={errors.lastName}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="email"
              type="email"
              label={
                <FormattedMessage id="User.email" defaultMessage="Email" />
              }
              placeholder={formatMessage({
                id: "User.typeEmail",
                defaultMessage: "Type email"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.email} errorMsgId={errors.email} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="phone"
              type="text"
              label={
                <FormattedMessage id="User.phone" defaultMessage="Phone" />
              }
              placeholder={formatMessage({
                id: "User.typePhone",
                defaultMessage: "Type phone"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.phone} errorMsgId={errors.phone} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              name="birthDate"
              label={
                <FormattedMessage
                  id="General.birthDate"
                  defaultMessage="Birth date"
                />
              }
              placeholder={formatMessage({
                id: "General.birthDate",
                defaultMessage: "Select birth date"
              })}
              component={FormDatePiker}
              onChange={setFieldValue}
              disableFuture={true}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="gender"
              label={
                <FormattedMessage id="General.gender" defaultMessage="Gender" />
              }
              placeholder={formatMessage({
                id: "From.address.typeCountry",
                defaultMessage: "Select gender"
              })}
              component={FormSelect}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" }
              ]}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.gender} errorMsgId={errors.gender} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="password"
              type="password"
              label={
                <FormattedMessage
                  id="User.password"
                  defaultMessage="Password"
                />
              }
              placeholder={formatMessage({
                id: "User.typePassword",
                defaultMessage: "Type password"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={touched.password}
                errorMsgId={errors.password}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="passwordConfirm"
              type="password"
              label={
                <FormattedMessage
                  id="User.confirmPassword"
                  defaultMessage="Confirm password"
                />
              }
              placeholder={formatMessage({
                id: "User.typeConfirmPassword",
                defaultMessage: "Type password confirm"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={touched.passwordConfirm}
                errorMsgId={errors.passwordConfirm}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper>
            <input
              id="userImage"
              onChange={(event: any) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              multiple
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

          <StyledFieldWrapper item xs={12} sm={3}>
            <Field
              name="address.street"
              type="text"
              label={
                <FormattedMessage
                  id="From.address.street"
                  defaultMessage="Street"
                />
              }
              placeholder={formatMessage({
                id: "From.address.typeStreet",
                defaultMessage: "Type street"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={get(touched, "address.street")}
                errorMsgId={get(errors, "address.street")}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={3}>
            <Field
              name="address.city"
              type="text"
              label={
                <FormattedMessage
                  id="From.address.city"
                  defaultMessage="City"
                />
              }
              placeholder={formatMessage({
                id: "From.address.typeCity",
                defaultMessage: "Type city"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={get(touched, "address.city")}
                errorMsgId={get(errors, "address.city")}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={3}>
            <Field
              name="address.postalCode"
              type="text"
              label={
                <FormattedMessage
                  id="From.address.zipCode"
                  defaultMessage="Zip Code"
                />
              }
              placeholder={formatMessage({
                id: "From.address.typeZipCode",
                defaultMessage: "Type Zip Code"
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={get(touched, "address.postalCode")}
                errorMsgId={get(errors, "address.postalCode")}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={3}>
            <Field
              required
              name="address.country"
              label={
                <FormattedMessage
                  id="From.address.country"
                  defaultMessage="Country"
                />
              }
              placeholder={formatMessage({
                id: "From.address.typeCountry",
                defaultMessage: "Type country"
              })}
              component={FormSelect}
              options={countries.map((country: ICountry) => ({
                value: country.code,
                label: country.name
              }))}
            />

            <StyledFormErrorWrapper>
              <FormError
                touched={get(touched, "address.country")}
                errorMsgId={get(errors, "address.country")}
              />
            </StyledFormErrorWrapper>
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
    </StyledUserFormWrapper>
  );
};

export default withFormik<IRegisterUserProps, IRegisterUserActionPayload>({
  displayName: "User form",
  validationSchema,
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
    passwordConfirm,
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
      passwordConfirm,
      image
    };
  }
})(UserForm);
