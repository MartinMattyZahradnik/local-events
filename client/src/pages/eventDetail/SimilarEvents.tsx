import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import { Grid } from "@material-ui/core";
import { EventCard } from "components";

// Actions
import { fetchSimilarEvents } from "redux/eventDetail/actions";

// Selectors
import { selectSimilarEvents } from "redux/eventDetail/selectors";

// Types
import { IEvent } from "redux/eventDetail/types";

const StyledEventCardWrapper = styled.div`
  margin-right: 2%;
  width: 23%;
  margin-bottom: 2.5rem;
`;

interface ISimilarEventsProps {
  eventId: string;
  limit?: number;
}

const SimilarEvents = ({ eventId, limit = 4 }: ISimilarEventsProps) => {
  const dispatch = useDispatch();
  const similarEvents = useSelector(selectSimilarEvents);
  useEffect(() => {
    dispatch(fetchSimilarEvents(eventId, limit));
  }, [dispatch, eventId, limit]);

  return (
    <Grid container>
      {similarEvents.map((event: IEvent) => (
        <StyledEventCardWrapper key={event._id}>
          <Link to={`/event/${event._id}`}>
            <EventCard event={event} />
          </Link>
        </StyledEventCardWrapper>
      ))}
    </Grid>
  );
};

export default SimilarEvents;
