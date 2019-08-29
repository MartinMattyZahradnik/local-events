import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { IEvent } from "redux/events/types";
type MatchParams = {
  id: string;
};
interface IEventDetailProps extends RouteComponentProps<MatchParams> {
  event: IEvent;
}

const EventDetail = ({ match, event }: IEventDetailProps) => {
  return <div>EventDetail {match.params.id}</div>;
};

export default EventDetail;
