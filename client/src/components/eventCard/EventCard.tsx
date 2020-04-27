import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import { Card, CardContent, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

// Types
import { IEvent } from "redux/events/types";

// Selectors
import { makeSelectHasRightToEditEvent } from "redux/events/selectors";

// Other
import { localizePrice } from "localization";

const StyledEditIcon = styled(EditIcon)`
  display: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.color.primary};
`;

const StyledCard = styled(Card)`
  position: relative;
  &:hover ${StyledEditIcon} {
    display: block;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;

const StyledHeading = styled.h3`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 700;
  font-size: ${({ theme }) => theme.text.fontSize.normal};
  text-align: left;
  margin-bottom: 0;
`;

const StyledSubheading = styled.h4`
  color: ${({ theme }) => theme.color.subHeading};
  font-size: ${({ theme }) => theme.text.fontSize.small};
  margin-bottom: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDate = styled(Grid)``;
const StyledMonth = styled.span`
  text-transform: uppercase;
  color: #dbd4cc;
  margin-right: 0.5rem;
`;

const StyledDescription = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.text.fontSize.small};
`;

const StyledCardContent = styled(CardContent)`
  height: 15rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.text};
  &.MuiCardContent-root:last-child {
    padding-bottom: 1.6rem;
  }
`;

const StyledPriceWrapper = styled(Grid)`
  margin-top: auto;
  font-size: ${({ theme }) => theme.text.fontSize.normal};
  color: ${({ theme }) => theme.color.primary};
`;

const StyledPrice = styled.span`
  margin-left: auto;
  font-weight: 700;
`;

interface IEventCardProps {
  event: IEvent;
}

const EventCard = ({ event }: IEventCardProps) => {
  const {
    _id,
    name,
    imageUrl,
    description,
    date,
    price,
    address: { city, street },
    owner,
  } = event;

  const hasRightToEditEvent = useSelector(
    makeSelectHasRightToEditEvent(owner._id)
  );

  return (
    <StyledCard data-testid="event-card">
      {hasRightToEditEvent && (
        <Link to={`/event/${_id}/update`}>
          <StyledEditIcon />
        </Link>
      )}
      <StyledImage src={imageUrl} />
      <StyledCardContent>
        <StyledHeading data-testid="event-card-name">{name}</StyledHeading>
        <StyledSubheading>
          {city} {street}
        </StyledSubheading>
        <StyledDescription data-testid="event-card-description">
          {description}
        </StyledDescription>

        <StyledPriceWrapper container alignItems="center">
          <StyledDate data-testid="event-card-date">
            <StyledMonth>{format(date, "MMM")}</StyledMonth>
            {format(date, "d")}
          </StyledDate>
          <StyledPrice data-testid="event-card-price">
            {localizePrice(price.price, price.locale, price.currency)}
          </StyledPrice>
        </StyledPriceWrapper>
      </StyledCardContent>
    </StyledCard>
  );
};

export default EventCard;
