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
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
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
