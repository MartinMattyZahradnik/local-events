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

const CreateEvent: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleSubmit = (values: any) => {
    dispatch(createEvent(values));
  };

  return (
    <StyledFormWrapper container>
      <EventForm
        onSubmit={handleSubmit}
        actionButtonLabel={intl.formatMessage({
          id: "General.create",
          defaultMessage: "Create"
        })}
      />
    </StyledFormWrapper>
  );
};

export default CreateEvent;
