import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// Components
import { EventCard } from "components";
import { Pagination } from "components/common";
import { Grid } from "@material-ui/core";

// Actions
import { fetchEvents } from "redux/events/actions";

// Selectors
import {
  selectEvents,
  selectEventsTotal,
  selectEventsIsLoading,
  selectEventsError,
  selectSearchTerm,
  selectSearchCity,
} from "redux/events/selectors";

// Types
import { IEvent } from "redux/events/types";

const StyledEventList = styled.div`
  @media screen and (min-width: 1280px) {
    padding: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 3.5rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0 2rem;
  }
`;

const StyledHeading = styled.h2`
  margin: 0 0 3rem 0;
  font-weight: 700;
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.text.fontSize.big};
  line-height: ${({ theme }) => theme.text.lineHeight.big};
`;

const StyledPaginationWrapper = styled.div`
  margin-top: 4.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-top: 3.5rem;
  }
`;

const StyledNoEvents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 13rem); /*  header + padding */
  font-size: 2rem;
  font-weight: bolder;
  letter-spacing: 0.2rem;
`;

const EventList = (): JSX.Element | null => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchCity = useSelector(selectSearchCity);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents(1, 10));
  }, [dispatch, searchTerm, searchCity]);

  const events = useSelector(selectEvents, shallowEqual);
  const total = useSelector(selectEventsTotal, shallowEqual);
  const isLoading = useSelector(selectEventsIsLoading, shallowEqual);
  const error = useSelector(selectEventsError, shallowEqual);

  if (!events || error) {
    // @Todo - create component for handling errors
    return null;
  }

  if (!isLoading && events.length === 0) {
    return (
      <StyledNoEvents data-testid="no-events-message">
        Sorry, there are no events match your search criteria
      </StyledNoEvents>
    );
  }

  const handlePaginationChange = (pageNumber: number, perPage: number) => {
    dispatch(fetchEvents(pageNumber, perPage));
  };

  return (
    <StyledEventList data-testid="event-list">
      {/* @TODO preset unknown visitor with data from https://ipinfo.io - setup search */}
      <StyledHeading data-testid="heading">
        <FormattedMessage
          id="EventList.heading"
          defaultMessage="Popular Events in"
        />{" "}
        Bratislava
      </StyledHeading>
      <Grid container spacing={5} data-testid="event-list-cards">
        {events.map((event: IEvent) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
            <Link to={`/event/${event._id}`}>
              <EventCard event={event} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <StyledPaginationWrapper>
        <Pagination
          onChange={handlePaginationChange}
          total={total}
          dataTestid="event-list-pagination"
        />
      </StyledPaginationWrapper>
    </StyledEventList>
  );
};

export default EventList;
