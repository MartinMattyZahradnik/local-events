import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import EventHeader from "./EventHeader";

// Actions
import { fetchEventDetail, resetEventDetail } from "redux/eventDetail/actions";

// Selectors
import { selectEventDetail } from "redux/eventDetail/selectors";

type MatchParams = {
  id: string;
};
interface IEventDetailProps extends RouteComponentProps<MatchParams> {}

const EventDetail = ({ match }: IEventDetailProps) => {
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
    <>
      <EventHeader event={event} />
    </>
  );
};

export default EventDetail;
