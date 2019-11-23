import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

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
import { Modal } from "bricks";

// Actions
import { fetchEventsByUserId, deleteEvent } from "redux/events/actions";

import {
  selectMyEventsResult,
  selectMyEventsError,
  selectMyEventsIsLoading
} from "redux/events/selectors";

// Others
import { timestampToDate } from "utils/date";
import { formatAddress } from "utils/general";

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
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { id } = match.params;
  useEffect(() => {
    dispatch(fetchEventsByUserId(id));
  }, [id]);

  const events = useSelector(selectMyEventsResult);
  const isLoading = useSelector(selectMyEventsIsLoading);
  const hasError = useSelector(selectMyEventsError);
  const handleDeleteEvent = (eventId: string | null) => () => {
    if (eventId) {
      dispatch(deleteEvent(eventId));
    }

    setActiveEventId(null);
  };

  if (isLoading) {
    return null;
  }

  if (hasError) {
    return <Redirect to="/" />;
  }

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
              <TableCell align="center">
                <FormattedMessage id="Event.update" defaultMessage="Update" />
              </TableCell>
              <TableCell align="center">
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
                <TableCell align="center">
                  <StyledIconLink to={`/event/${event._id}/update`}>
                    <EditIcon />
                  </StyledIconLink>
                </TableCell>
                <TableCell align="center">
                  <StyledDeleteIcon
                    onClick={() => setActiveEventId(event._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Modal
        open={Boolean(activeEventId)}
        onClose={() => setActiveEventId(null)}
        onConfirm={handleDeleteEvent(activeEventId)}
        title="Do you really want to delete event?"
        confirmLabel={
          <FormattedMessage id="General.confirm" defaultMessage="Confirm" />
        }
        cancelLabel={
          <FormattedMessage id="General.cancel" defaultMessage="Cancel" />
        }
      />
    </StyledMyEventsWrapper>
  );
};

export default MyEvents;
