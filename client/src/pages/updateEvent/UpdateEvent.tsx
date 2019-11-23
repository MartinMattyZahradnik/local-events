import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router-dom";

// Components

import { Grid } from "@material-ui/core";
import { EventForm } from "components";

// Actions
import { fetchEventDetail } from "redux/eventDetail/actions";
import { updateEvent } from "redux/events/actions";

// Selectors
import { selectHasAccessPermission } from "redux/events/selectors";
import { selectEventDetail } from "redux/eventDetail/selectors";
import { selectUserId } from "redux/user/selectors";

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

type MatchParams = {
  id: string;
};

interface IUpdateEventPageProps extends RouteComponentProps<MatchParams> {}

const UpdateEventPage: React.FC<IUpdateEventPageProps> = ({ match }) => {
  const { formatMessage } = useIntl();
  const { id } = match.params;
  const dispatch = useDispatch();
  const event = useSelector(selectEventDetail);
  const userId = useSelector(selectUserId);
  const hasAccessPermission = useSelector(selectHasAccessPermission);

  useEffect(() => {
    dispatch(fetchEventDetail(id));
  }, [dispatch, id]);

  const handleSubmit = (values: any) => {
    dispatch(updateEvent(id, values));
  };

  if (!event) {
    return null;
  }

  if (!hasAccessPermission) {
    return <Redirect to={`/user/${userId}/events`} />;
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
