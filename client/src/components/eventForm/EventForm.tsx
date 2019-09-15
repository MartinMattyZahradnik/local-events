import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components
import { Form, FormikProps, withFormik, Field } from "formik";
import { FormField, FormSelect, FormDatePiker } from "components/common";
import { Button } from "bricks";
import { Card, Grid } from "@material-ui/core";

// Types
import { ICreateEventActionPayload } from "redux/events/types";

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

interface IEventFormValues extends ICreateEventActionPayload {}

interface ICreateEventProps extends IEventFormValues {
  onSubmit: (formValues: ICreateEventActionPayload) => any;
  actionButtonLabel: string;
}

const EventForm = (
  props: ICreateEventProps & FormikProps<IEventFormValues>
) => {
  const {
    isSubmitting,
    handleSubmit,
    setFieldValue,
    actionButtonLabel
  } = props;
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
              name="name"
              type="text"
              label="Event Name"
              placeholder="Type Event Name"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              name="date"
              label="Event Date"
              placeholder="Select event date"
              component={FormDatePiker}
              onChange={setFieldValue}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
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

          <StyledFieldWrapper item xs={6}>
            <Field
              required
              name="imageUrl"
              type="text"
              label="Image url"
              placeholder="Type image url"
              component={FormField}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper item xs={6}>
            <Field
              required
              name="images"
              type="text"
              label="Images urls"
              placeholder="Type images urls ,"
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

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              type="number"
              name="price"
              label="Price"
              placeholder="Type Event Price"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              type="text"
              name="tags"
              label="Tags"
              placeholder="Type Tags"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={3}>
            <Field
              required
              type="text"
              name="coordinates"
              label="Coordinates"
              placeholder="Type comma-separated coordinates"
              component={FormField}
            />
          </StyledFieldWrapper>

          <StyledFieldWrapper item xs={12}>
            <Field
              multiline
              name="description"
              type="text"
              label="Event description"
              placeholder="Type Event description"
              component={FormField}
            />
          </StyledFieldWrapper>
        </Grid>

        <Grid container>
          <StyledButton type="submit" disabled={isSubmitting}>
            {actionButtonLabel}
          </StyledButton>
        </Grid>
      </Form>
    </StyledRegisterUserWrapper>
  );
};

export default withFormik<ICreateEventProps, ICreateEventActionPayload>({
  displayName: "Event form",
  handleSubmit(values, { props, setSubmitting }) {
    props.onSubmit(values);
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
