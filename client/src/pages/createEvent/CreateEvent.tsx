import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components

import { Grid } from "@material-ui/core";
import { EventForm } from "components";

// Actions
import { createEvent } from "redux/events/actions";

// Types

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  width: 80rem;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: 0 3.5rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0;
    height: auto;
  }
`;

const emptyEvent = {
  name: "",
  description: "",
  imageUrl: "",
  date: Date.now(),
  category: [],
  price: {
    price: 0,
    currency: "EUR",
    locale: "en"
  },
  tags: [],
  address: {
    street: "",
    postalCode: "",
    city: "",
    countryCode: "",
    country: ""
  }
};

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const handleSubmit = (values: any) => {
    dispatch(createEvent(values));
  };

  return (
    <StyledFormWrapper container>
      <EventForm
        {...emptyEvent}
        onSubmit={handleSubmit}
        actionButtonLabel={formatMessage({
          id: "General.create",
          defaultMessage: "Create"
        })}
        formHeading={formatMessage({
          id: "Event.create",
          defaultMessage: "Create Event"
        })}
      />
    </StyledFormWrapper>
  );
};

export default CreateEvent;
