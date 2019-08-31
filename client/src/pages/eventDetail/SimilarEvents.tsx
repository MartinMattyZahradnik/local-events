import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import { Card } from "@material-ui/core";

// Actions
import { fetchSimilarEvents } from "redux/eventDetail/actions";

// Types
import { IEvent } from "redux/eventDetail/types";

const StyledSimilarEvents = styled(Card)`
  width: 100%;
  padding: 2rem;
`;

interface ISimilarEventsProps {
  event: IEvent;
}

const SimilarEvents = ({ event }: ISimilarEventsProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSimilarEvents(event));
  }, [dispatch, event]);

  return <StyledSimilarEvents>Similar Events</StyledSimilarEvents>;
};

export default SimilarEvents;
