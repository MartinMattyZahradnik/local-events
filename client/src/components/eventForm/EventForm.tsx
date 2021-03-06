import React, { useEffect } from "react";
import styled from "styled-components";
import { useIntl, FormattedMessage } from "react-intl";
import get from "lodash.get";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import {
  FormField,
  FormSelect,
  FormDatePiker,
  FormHeader,
  FormError,
  UploadFilePreview,
} from "components/common";
import { Button } from "bricks";
import { Card, Grid } from "@material-ui/core";

// Actions
import { fetchCountryList } from "redux/application/actions";
import { ICountry } from "redux/application/types";

// Types
import { IEventFormValues } from "redux/events/types";

// Selectors
import { selectEventCategories } from "redux/events/selectors";
import { selectCountryList } from "redux/application/selectors";

// Others
import validationSchema from "./EventFormValidationSchema";
import { history } from "App";

const StyledEventFormWrapper = styled(Card)`
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

const StyledUploadBtn = styled(Button)`
  margin: 2rem 0 1rem 0;
  font-size: 1.4rem;
  width: 100%;
  height: 4rem;
  margin-bottom: 0;
`;

const StyledFormErrorWrapper = styled.div`
  position: absolute;
  top: -1.2rem;
  right: 2rem;
`;

const StyledDescriptionWrapper = styled(Grid)`
  margin-bottom: 2rem;
  padding: 1.2rem 2rem 0 2rem;
  position: relative;
`;

const StyledFormFooter = styled(Grid)`
  padding: 0 2rem;
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

interface ICreateEventProps extends IEventFormValues {
  onSubmit: (formValues: IEventFormValues) => void;
  actionButtonLabel: string;
  formHeading: string;
}

const EventForm = (
  props: ICreateEventProps & FormikProps<IEventFormValues>
) => {
  const {
    isSubmitting,
    setFieldValue,
    actionButtonLabel,
    formHeading,
    touched,
    errors,
    imageUrl,
    date,
  } = props;
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  const categories = useSelector(selectEventCategories);
  const countries = useSelector(selectCountryList);
  return (
    <StyledEventFormWrapper data-testid="event-form">
      <FormHeader formHeading={formHeading} />
      <StyledForm>
        <Grid container>
          <StyledHeading>
            {formatMessage({
              id: "Event.details",
              defaultMessage: "Event details",
            })}
          </StyledHeading>
          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="name"
              type="text"
              label={
                <FormattedMessage id="Event.name" defaultMessage="Event Name" />
              }
              placeholder={formatMessage({
                id: "Event.typeName",
                defaultMessage: "Enter event name",
              })}
              component={FormField}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.name} errorMsgId={errors.name} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              name="date"
              label={
                <FormattedMessage id="Event.date" defaultMessage="Event date" />
              }
              placeholder={formatMessage({
                id: "Event.dateSelect",
                defaultMessage: "Select event date",
              })}
              component={FormDatePiker}
              onChange={setFieldValue}
              initialDate={date}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.date} errorMsgId={errors.date} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              name="category"
              label={
                <FormattedMessage
                  id="Event.category"
                  defaultMessage="Event category"
                />
              }
              placeholder="Select category"
              component={FormSelect}
              multiple
              options={categories.map((category) => ({
                value: category,
                label: formatMessage({
                  id: `Event.category.${category}`,
                  defaultMessage: category,
                }),
              }))}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <StyledUploadBtn>
              <label htmlFor="eventImageFile">
                {formatMessage({
                  id: "Event.uploadImages",
                  defaultMessage: "Upload images",
                })}
              </label>
            </StyledUploadBtn>
          </StyledFieldWrapper>

          <UploadFilePreview
            onChange={setFieldValue}
            imageUrl={imageUrl}
            inputId="eventImageFile"
          />

          <StyledDescriptionWrapper item xs={12}>
            <Field
              multiline={true}
              name="description"
              type="text"
              label={
                <FormattedMessage
                  id="Event.description"
                  defaultMessage="Description"
                />
              }
              placeholder={formatMessage({
                id: "Event.typeDescription",
                defaultMessage: "Type event description",
              })}
              component={FormField}
            />
            <StyledFormErrorWrapper>
              <FormError
                touched={touched.description}
                errorMsgId={errors.description}
              />
            </StyledFormErrorWrapper>
          </StyledDescriptionWrapper>

          <StyledHeading>
            {formatMessage({
              id: "User.address",
              defaultMessage: "Address",
            })}
          </StyledHeading>
          <StyledFieldWrapper item xs={12} sm={6}>
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
                defaultMessage: "Type street",
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

          <StyledFieldWrapper item xs={12} sm={6}>
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
                defaultMessage: "Type Zip Code",
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

          <StyledFieldWrapper item xs={12} sm={6}>
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
                defaultMessage: "Type city",
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
          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              name="address.countryCode"
              label={
                <FormattedMessage
                  id="From.address.country"
                  defaultMessage="Country"
                />
              }
              placeholder={formatMessage({
                id: "From.address.typeCountry",
                defaultMessage: "Type country",
              })}
              component={FormSelect}
              options={countries.map((country: ICountry) => ({
                value: country.code,
                label: country.name,
              }))}
            />
            <StyledFormErrorWrapper>
              <FormError
                touched={get(touched, "address.country")}
                errorMsgId={get(errors, "address.country")}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              type="number"
              name="price"
              label={
                <FormattedMessage id="General.price" defaultMessage="Price" />
              }
              placeholder={formatMessage({
                id: "General.typePrice",
                defaultMessage: "Type price",
              })}
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              type="text"
              name="tags"
              label={
                <FormattedMessage id="General.tags" defaultMessage="Tags" />
              }
              placeholder={formatMessage({
                id: "General.typeTags",
                defaultMessage: "Type tags",
              })}
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              type="text"
              name="coordinates"
              label={
                <FormattedMessage
                  id="General.coordinates"
                  defaultMessage="Coordinates"
                />
              }
              placeholder={formatMessage({
                id: "General.typeCoordinates",
                defaultMessage: "Type coordinates",
              })}
              component={FormField}
            />
          </StyledFieldWrapper>
        </Grid>

        <StyledFormFooter container>
          <StyledLink onClick={history.goBack}>
            {" "}
            {formatMessage({
              id: "General.back",
              defaultMessage: "Back",
            })}
          </StyledLink>
          <StyledButton
            type="submit"
            disabled={isSubmitting}
            data-testid="event-form-submit"
          >
            {actionButtonLabel}
          </StyledButton>
        </StyledFormFooter>
      </StyledForm>
    </StyledEventFormWrapper>
  );
};

export default withFormik<ICreateEventProps, IEventFormValues>({
  displayName: "Event form",
  validationSchema,
  handleSubmit(values, { props, setSubmitting }) {
    props.onSubmit(values);
    setSubmitting(false);
  },
  mapPropsToValues({
    name,
    description,
    date,
    imageUrl,
    category,
    address,
    price,
    tags,
    coordinates,
  }) {
    return {
      name,
      description,
      date,
      imageUrl,
      category,
      address,
      price,
      tags,
      coordinates,
    };
  },
})(EventForm);
