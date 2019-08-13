import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { fetchEvents } from "actions/eventsActions";

const EventList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  });

  return <div>Event List</div>;
};

export default EventList;
