import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface IEventDetailProps extends RouteComponentProps<{ id: string }> {
  // other pros
}

const EventDetail = ({ match }: IEventDetailProps) => {
  return <div>EventDetail {match.params.id}</div>;
};

export default EventDetail;
