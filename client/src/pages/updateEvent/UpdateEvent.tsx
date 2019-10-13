import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";

// Components

import { Grid } from "@material-ui/core";
import { EventForm } from "components";

// Actions
import { fetchEventDetail } from "redux/eventDetail/actions";
import { updateEvent } from "redux/events/actions";

// Selectors
import { selectEventDetail } from "redux/eventDetail/selectors";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
`;

type MatchParams = {
  id: string;
};

interface IUpdateEventPageProps extends RouteComponentProps<MatchParams> {}

const UpdateEventPage: React.FC<IUpdateEventPageProps> = ({ match }) => {
  const { formatMessage } = useIntl();
  const { id } = match.params;
  const dispatch = useDispatch();
  const event = useSelector(selectEventDetail);

  useEffect(() => {
    dispatch(fetchEventDetail(id));
  }, [dispatch, id]);

  const handleSubmit = (values: any) => {
    dispatch(updateEvent(values));
  };

  if (!event) {
    return null;
  }

  return (
    <StyledFormWrapper container>
      <EventForm
        onSubmit={handleSubmit}
        actionButtonLabel={formatMessage({
          id: "General.update",
          defaultMessage: "Update"
        })}
        {...event}
        formHeading={formatMessage({
          id: "Event.update",
          defaultMessage: "Update Event"
        })}
      />
    </StyledFormWrapper>
  );
};

export default UpdateEventPage;
