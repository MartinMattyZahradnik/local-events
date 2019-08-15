import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";

// Components
import { EventCard } from "components";

// Actions
import { fetchEvents } from "actions/eventsActions";

// Selectors
import {
  selectEvents,
  selectEventsIsLoading,
  selectEventsError
} from "actions/eventsActions";

// Types
import { IEvent } from "actions/eventsActions";

const StyledEventCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledEventCardWrapper = styled.div`
  margin-right: 2%;
  width: 23%;
  margin-bottom: 2.5rem;
`;

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const events = useSelector(selectEvents, shallowEqual);
  const isLoading = useSelector(selectEventsIsLoading, shallowEqual);
  const error = useSelector(selectEventsError, shallowEqual);

  if (!events || error) {
    // @Todo - create component for handling errors
    return null;
  }

  if (isLoading) {
    // @Todo - create loading component
    return <div>Loading</div>;
  }

  return (
    <StyledEventCardList>
      {events.map((event: IEvent) => (
        <StyledEventCardWrapper>
          <EventCard key={event.id} event={event} />
        </StyledEventCardWrapper>
      ))}
    </StyledEventCardList>
  );
};

export default EventList;
