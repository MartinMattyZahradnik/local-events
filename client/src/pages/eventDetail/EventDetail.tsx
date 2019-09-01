import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components
import { Grid, Card, Chip } from "@material-ui/core";
import EventHeader from "./EventHeader";
import SimilarEvents from "./SimilarEvents";
import { Map } from "components/common";
// Actions
import { fetchEventDetail, resetEventDetail } from "redux/eventDetail/actions";

// Selectors
import { selectEventDetail } from "redux/eventDetail/selectors";

const StyledEventContent = styled(Card)`
  width: 70%;
  margin-right: 5%;
  padding: 2rem;
`;

const StyledEventImage = styled.img`
  width: 100%;
  margin-bottom: 2.5rem;
`;

const StyledTag = styled(Chip)`
  margin-right: 1rem;
  color: ${({ theme }) => theme.color.secondary};
  border-color: ${({ theme }) => theme.color.secondary};
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledSideBar = styled(Card)`
  width: 25%;
  padding: 2rem;
  margin-bottom: 5rem;
  height: fit-content;
`;

const StyledHeading = styled.h2`
  font-size: 2.2rem;
  text-align: left;
  margin-bottom: 2.5rem;
  text-transform: capitalize;
`;

const StyledSimilarEventsHeading = styled.h2`
  font-size: 2.2rem;
  margin: 3rem 0;
  position: relative;
`;

const StyledDescription = styled.p`
  margin-bottom: 2rem;
`;

const StyledTags = styled(Grid)`
  margin-bottom: 3rem;
`;

type MatchParams = {
  id: string;
};

interface IEventDetailProps extends RouteComponentProps<MatchParams> {}

const EventDetail = ({ match }: IEventDetailProps) => {
  const intl = useIntl();
  const { id } = match.params;
  const eventDetail = useSelector(selectEventDetail);
  const event = eventDetail.result;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventDetail(id));
    return () => {
      dispatch(resetEventDetail());
    };
  }, [dispatch, id]);

  if (!event) {
    return null;
  }

  return (
    <Grid container>
      <EventHeader event={event} />
      <StyledEventContent>
        <StyledEventImage src={event.imageUrl} />
        <StyledHeading>{event.name}</StyledHeading>
        <StyledDescription>{event.description}</StyledDescription>
        <StyledHeading>
          {intl.formatMessage({ id: "General.tags", defaultMessage: "Tags" })}
        </StyledHeading>
        <StyledTags>
          {event.tags.map(tag => (
            <StyledTag key={tag} label={tag} variant="outlined" />
          ))}
        </StyledTags>
        {event.coordinates && (
          <Map
            initialCenter={{
              lat: event.coordinates[0],
              lng: event.coordinates[1]
            }}
            width="100%"
            height="40rem"
          />
        )}
      </StyledEventContent>

      <StyledSideBar>
        <h3>More Events In {event.address.city}</h3>
      </StyledSideBar>

      <StyledSimilarEventsHeading>
        {intl.formatMessage({
          id: "General.similarEvents",
          defaultMessage: "Similar Events"
        })}
      </StyledSimilarEventsHeading>
      <SimilarEvents eventId={event._id} />
    </Grid>
  );
};

export default EventDetail;
