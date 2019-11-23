import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// Actions
import { fetchEventsByUserId, deleteEvent } from "redux/events/actions";

// Types
import { IEvent } from "redux/events/types";

// Others
import { timestampToDate } from "utils/date";
import { formatAddress } from "utils/general";

const events = [
  {
    price: {
      price: 12,
      currency: "USD",
      locale: "en-US"
    },
    address: {
      street: "Long Meadow Brooklyn",
      postalCode: "11215",
      city: "New York",
      countryCode: "USA",
      country: "United States"
    },
    category: ["outdoor", "movie"],
    coordinates: [40.6452228, -74.0150371],
    similarEvents: [],
    tags: ["movie", "NY", "brooklyn"],
    _id: "5d5eae5bac4a0b0d14c411e8",
    owner: "5db9b60a694f2b0017c87436",
    name: "A Summer Movie Under the Stars",
    description:
      "Brooklyn Borough President Eric L. Adams and Prospect Park Alliance present A Summer Movie Under the Stars in partnership with Brooklyn’s Nitehawk Cinema. Join us for this popular summer series of free movies on Prospect Park's scenic Long Meadow, preceded by live entertainment, three consecutive Wednesday evenings starting July 17, with a rain date of August 1. Entertainment begins at 7 pm, followed by the movie screening at dusk.",
    date: 1566485928955,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F63728347%2F127325797991%2F1%2Foriginal.20190611-163219?w=800&auto=compress&rect=0%2C303%2C2000%2C1000&s=000f1f416ca56f8a1b8be0fd93940624",
    createdAt: "2019-08-22T15:01:47.994Z",
    updatedAt: "2019-08-22T15:01:47.994Z",
    __v: 0
  },
  {
    price: 19.22,
    address: {
      street: "Long Meadow Brooklyn 2",
      postalCode: "11218",
      city: "New York",
      countryCode: "USA",
      country: "United States"
    },
    category: ["outdoor", "movie", "fun"],
    coordinates: [40.6452228, -74.0150371],
    similarEvents: [],
    tags: ["movie,NY,brooklyn,fun"],
    _id: "5dbaf614f5103a5ac4dc72fd",
    owner: "5db9b60a694f2b0017c87436",
    name: "A Summer Movie Under the Stars vol 2.",
    description:
      "Brooklyn Borough President Eric L. Adams and Prospect Park Alliance present A Summer Movie Under the Stars in partnership with Brooklyn’s Nitehawk Cinema. Join us for this popular summer series of free movies on Prospect Park's scenic Long Meadow, preceded by live entertainment, three consecutive Wednesday evenings starting July 17, with a rain date of August 1. Entertainment begins at 7 pm, followed by the movie screening at dusk.",
    date: 1573398409408,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F63728347%2F127325797991%2F1%2Foriginal.20190611-163219?w=800&auto=compress&rect=0%2C303%2C2000%2C1000&s=000f1f416ca56f8a1b8be0fd93940624",
    createdAt: "2019-10-31T14:56:20.918Z",
    updatedAt: "2019-11-10T15:07:29.445Z",
    __v: 0
  }
];

const StyledMyEventsWrapper = styled.div`
  padding-top: 5rem;
`;

const StyledEventLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 800;
`;

const StyledIconLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

type MatchParams = {
  id: string;
};

interface IMyEventsProps extends RouteComponentProps<MatchParams> {}

const MyEvents = ({ match }: IMyEventsProps) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  useEffect(() => {
    dispatch(fetchEventsByUserId(id));
  }, [id]);

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(id));
  };

  return (
    <StyledMyEventsWrapper>
      <Paper>
        <Table aria-label="My events table">
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage id="Event.name" defaultMessage="Event name" />
              </TableCell>
              <TableCell>
                <FormattedMessage
                  id="Event.category"
                  defaultMessage="Category"
                />
              </TableCell>
              <TableCell>
                <FormattedMessage id="User.address" defaultMessage="Address" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="Event.date" defaultMessage="Date" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="Event.update" defaultMessage="Update" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="General.delete" defaultMessage="Delete" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <TableRow key={event._id}>
                <TableCell>
                  <StyledEventLink to={`/event/${event._id}`}>
                    {event.name}
                  </StyledEventLink>
                </TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{formatAddress(event.address)}</TableCell>
                <TableCell>{timestampToDate(event.date)}</TableCell>
                <TableCell>
                  <StyledIconLink to={`/event/${event._id}/update`}>
                    <EditIcon />
                  </StyledIconLink>
                </TableCell>
                <TableCell>
                  <StyledDeleteIcon onClick={handleDeleteEvent} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </StyledMyEventsWrapper>
  );
};

export default MyEvents;
