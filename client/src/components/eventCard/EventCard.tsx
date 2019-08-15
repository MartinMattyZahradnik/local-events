import React from "react";

// Components
import { Card, CardHeader, IconButton, Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Types
import { IEvent } from "actions/eventsActions";

interface IEventCardProps {
  event: IEvent;
}

const EventCard = ({ event }: IEventCardProps) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
};

export default EventCard;
