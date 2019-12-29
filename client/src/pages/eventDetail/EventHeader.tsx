import React, { useState } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { history } from "App";

// Components
import { Grid, Card } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "bricks";

// Actions
import { deleteEvent } from "redux/events/actions";

// Types
import { IEvent } from "redux/events/types";

// Selectors
import {
  makeSelectHasRightToEditEvent,
  makeSelectHasRightToDeleteEvent
} from "redux/events/selectors";

const StyledEventHeader = styled(Card)`
  display: flex;
  width: 100%;
  margin-bottom: 5rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 3rem;
    flex-direction: column;
  }
`;

const StyledEventImage = styled.img`
  width: 100%;
  height: 22rem;
  width: 22rem;
  margin-right: 1.5rem;
  object-fit: cover;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-right: 0;
    width: 100%;
    margin-bottom: 2.5rem;
  }
`;

const StyledContentWrapper = styled(Grid)`
  position: relative;
  padding: 2rem 3rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 1.5rem;
  }
`;

const StyledEventTitle = styled.h1`
  font-size: 2.6rem;
  text-align: left;
  margin-bottom: 2rem;
`;

const StyledHeaderRow = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  overflow: scroll;
  white-space: nowrap;
  max-width: 100%;
  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-bottom: 0.5rem;
    margin-bottom: 1.2rem;
    text-align: center;
  }
`;

const StyledLabel = styled.span`
  padding: 1rem;
  min-width: 12rem;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background: ${({ theme }) => theme.color.secondary};
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 2rem;
`;

const StyledActionsButtonsWrapper = styled(Grid)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: relative;
    top: 0rem;
    right: 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.color.primary};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    color: ${({ theme }) => theme.color.text};
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.color.primary};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    color: ${({ theme }) => theme.color.text};
  }
`;

const StyledEditIconLink = styled(Link)`
  padding: 1rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 50%;
    padding: 0;
    text-align: center;
    background: ${({ theme }) => theme.color.secondary};
    color: black;
    margin-right: 2rem;
    height: 100%;
    line-height: 5rem;
  }
`;

const StyledDeleteIconWrapper = styled.span`
  padding: 1rem;
  cursor: pointer;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
    width: 50%;
    text-align: center;
    background: ${({ theme }) => theme.color.secondary};
    color: black;
    height: 100%;
    line-height: 5rem;
  }
`;

interface IEventHeaderProps {
  event: IEvent;
}

const EventHeader = ({ event }: IEventHeaderProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { address } = event;
  const hasRightToEditEvent = useSelector(
    makeSelectHasRightToEditEvent(event.owner._id)
  );
  const hasRightToDeleteEvent = useSelector(
    makeSelectHasRightToDeleteEvent(event.owner._id)
  );

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(event._id));
    history.push("/");
  };

  return (
    <StyledEventHeader>
      <StyledEventImage src={event.imageUrl} />
      <StyledContentWrapper container direction="column">
        <StyledEventTitle>{event.name}</StyledEventTitle>
        <StyledHeaderRow>
          <StyledLabel>
            {intl.formatMessage({
              id: "General.time",
              defaultMessage: "Time"
            })}
          </StyledLabel>
          <span>{format(event.date, "dd.MM.yyyy")}</span>
        </StyledHeaderRow>
        <StyledHeaderRow>
          <StyledLabel>
            {intl.formatMessage({
              id: "General.place",
              defaultMessage: "Place"
            })}
          </StyledLabel>
          <span>
            {address.street}, {address.postalCode} {address.city},{" "}
            {address.country}
          </span>
        </StyledHeaderRow>
        <StyledHeaderRow>
          <StyledLabel>
            {intl.formatMessage({
              id: "General.createdBy",
              defaultMessage: "Created By"
            })}
          </StyledLabel>
          <span>{event.owner.userName}</span>
        </StyledHeaderRow>

        <StyledActionsButtonsWrapper>
          {hasRightToEditEvent && (
            <StyledEditIconLink to={`/event/${event._id}/update`}>
              <StyledEditIcon />
            </StyledEditIconLink>
          )}

          {hasRightToDeleteEvent && (
            <StyledDeleteIconWrapper onClick={() => setIsDeleteModalOpen(true)}>
              <StyledDeleteIcon />
            </StyledDeleteIconWrapper>
          )}
        </StyledActionsButtonsWrapper>
      </StyledContentWrapper>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
        title="Do you really want to delete event?"
        confirmLabel={
          <FormattedMessage id="General.confirm" defaultMessage="Confirm" />
        }
        cancelLabel={
          <FormattedMessage id="General.cancel" defaultMessage="Cancel" />
        }
      />
    </StyledEventHeader>
  );
};

export default EventHeader;
