import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// Components
import { EventCard } from "components";
import { Pagination } from "components/common";

// Actions
import { fetchEvents } from "redux/events/actions";

// Selectors
import {
  selectEvents,
  selectEventsTotal,
  selectEventsIsLoading,
  selectEventsError
} from "redux/events/selectors";

// Types
import { IEvent } from "redux/events/types";

const StyledEventCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledEventCardWrapper = styled.div`
  margin-right: 2%;
  width: 23.5%;
  margin-bottom: 2.5rem;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
`;

const StyledHeading = styled.h2`
  margin: 0 0 3rem 0;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.big};
  line-height: ${({ theme }) => theme.text.lineHeight.big};
`;

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(1, 10));
  }, [dispatch]);

  const events = useSelector(selectEvents, shallowEqual);
  const total = useSelector(selectEventsTotal, shallowEqual);
  const isLoading = useSelector(selectEventsIsLoading, shallowEqual);
  const error = useSelector(selectEventsError, shallowEqual);

  if (!events || error) {
    // @Todo - create component for handling errors
    return null;
  }

  if (!isLoading && events.length === 0) {
    return <div>Currently there are no events</div>;
  }

  const handlePaginationChange = (pageNumber: number, perPage: number) => {
    dispatch(fetchEvents(pageNumber, perPage));
  };

  return (
    <>
      {/* @TODO preset unknow visitor with data from https://ipinfo.io - setup search */}
      <StyledHeading>
        <FormattedMessage
          id="EventList.heading"
          defaultMessage="Popular Events in"
        />{" "}
        Bratislava
      </StyledHeading>
      <StyledEventCardList>
        {events.map((event: IEvent) => (
          <StyledEventCardWrapper key={event._id}>
            <Link to={`/event/${event._id}`}>
              <EventCard event={event} />
            </Link>
          </StyledEventCardWrapper>
        ))}
      </StyledEventCardList>

      <Pagination onChange={handlePaginationChange} total={total} />
    </>
  );
};

export default EventList;
