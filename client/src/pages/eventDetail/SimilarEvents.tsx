import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { Grid } from "@material-ui/core";
import { EventCard } from "components";

// Actions
import { fetchSimilarEvents } from "redux/eventDetail/actions";

// Selectors
import { selectSimilarEvents } from "redux/eventDetail/selectors";

// Types
import { IEvent } from "redux/events/types";

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
    <Grid container spacing={3}>
      {similarEvents.map((event: IEvent) => (
        <Grid item xs={12} sm={6} md={3} key={event._id}>
          <Link to={`/event/${event._id}`}>
            <EventCard event={event} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default SimilarEvents;
