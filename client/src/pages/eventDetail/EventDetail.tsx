import React from "react";

interface IEventDetailProps {
  match: any;
}

const EventDetail = ({ match }: IEventDetailProps) => {
  return <div>EventDetail {match.params.id}</div>;
};

export default EventDetail;
