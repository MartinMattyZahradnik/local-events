import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import get from "lodash.get";

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
import { ICreateEventActionPayload } from "redux/events/types";

// Others
import validationSchema from "./EventFormValidationSchema";

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
  width: 20rem;
`;

const StyledFormErrorWrapper = styled.div`
  position: absolute;
  top: -1.2rem;
  right: 2rem;
`;

interface IEventFormValues extends ICreateEventActionPayload {}

interface ICreateEventProps extends IEventFormValues {
  onSubmit: (formValues: ICreateEventActionPayload) => any;
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
    errors
  } = props;
  const { formatMessage } = useIntl();

  return (
    <StyledEventFormWrapper>
      <FormHeader formHeading={formHeading} />
      <StyledForm>
        <Grid container>
          <StyledHeading>
            {formatMessage({
              id: "Event.details",
              defaultMessage: "Event details"
            })}
          </StyledHeading>
          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="name"
              type="text"
              label="Event Name"
              placeholder="Type Event Name"
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
              label="Event Date"
              placeholder="Select event date"
              component={FormDatePiker}
              onChange={setFieldValue}
            />

            <StyledFormErrorWrapper>
              <FormError touched={touched.date} errorMsgId={errors.date} />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              name="category"
              label="Category"
              placeholder="Select category"
              component={FormSelect}
              options={[
                { value: "fun", label: "Fun" },
                { value: "family", label: "Family" }
              ]}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              multiline={true}
              name="description"
              type="text"
              label="Event description"
              placeholder="Type Event description"
              component={FormField}
            />
            <StyledFormErrorWrapper>
              <FormError
                touched={touched.description}
                errorMsgId={errors.description}
              />
            </StyledFormErrorWrapper>
          </StyledFieldWrapper>

          <Grid container justify="center">
            <StyledUploadBtn>
              <label htmlFor="userImage">
                {formatMessage({
                  id: "Event.uploadImages",
                  defaultMessage: "Upload images"
                })}
              </label>
            </StyledUploadBtn>
          </Grid>

          <StyledHeading>
            {formatMessage({
              id: "User.address",
              defaultMessage: "Address"
            })}
          </StyledHeading>
          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              name="address.street"
              type="text"
              label="Street"
              placeholder="Type street"
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
              label="Zip Code"
              placeholder="Type Zip Code"
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
              label="City"
              placeholder="Type City"
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
              name="address.country"
              label="Country"
              placeholder="Select country"
              component={FormSelect}
              options={[{ value: "US", label: "United States" }]}
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
              label="Price"
              placeholder="Type Event Price"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              type="text"
              name="tags"
              label="Tags"
              placeholder="Type Tags"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12} sm={6}>
            <Field
              required
              type="text"
              name="coordinates"
              label="Coordinates"
              placeholder="Type comma-separated coordinates"
              component={FormField}
              multiline
            />
          </StyledFieldWrapper>
        </Grid>

        <Grid container>
          <StyledButton type="submit" disabled={isSubmitting}>
            {actionButtonLabel}
          </StyledButton>
        </Grid>
      </StyledForm>
    </StyledEventFormWrapper>
  );
};

export default withFormik<ICreateEventProps, ICreateEventActionPayload>({
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
    images,
    category,
    address,
    price,
    tags,
    coordinates
  }) {
    return {
      name,
      description,
      date,
      imageUrl,
      images,
      category,
      address,
      price,
      tags,
      coordinates
    };
  }
})(EventForm);
