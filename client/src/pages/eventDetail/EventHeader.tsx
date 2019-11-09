import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { format } from "date-fns";

// Components
import { Grid, Card } from "@material-ui/core";

// Types
import { IEvent } from "redux/events/types";

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
  }
`;

const StyledContentWrapper = styled(Grid)`
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
  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1.2rem;
    text-align: center;
  }
`;

const StyledLabel = styled.span`
  padding: 1rem;
  width: 12rem;
  text-align: center;
  display: block;
  text-transform: uppercase;
  background: ${({ theme }) => theme.color.secondary};
  font-size: 1.4rem;
  font-weight: bold;
  margin-right: 2rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

interface IEventHeaderProps {
  event: IEvent;
}

const EventHeader = ({ event }: IEventHeaderProps) => {
  const intl = useIntl();
  const { address } = event;

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
      </StyledContentWrapper>
    </StyledEventHeader>
  );
};

export default EventHeader;
