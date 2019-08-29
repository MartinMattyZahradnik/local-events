import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

// Components
import { Card, CardContent, Grid } from "@material-ui/core";

// Types
import { IEvent } from "redux/events/types";

// Other
import { localizePrice } from "localization";

interface IEventCardProps {
  event: IEvent;
}

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
  margin-bottom: 1rem;
`;

const StyledSubheading = styled.h4`
  color: ${({ theme }) => theme.color.subHeading};
  font-size: ${({ theme }) => theme.text.fontSize.small};
  margin-bottom: 1.7rem;
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

const EventCard = ({ event }: IEventCardProps) => {
  const {
    name,
    imageUrl,
    description,
    date,
    price,
    address: { city, street }
  } = event;
  return (
    <Card>
      <StyledImage src={imageUrl} />
      <StyledCardContent>
        <StyledHeading>{name}</StyledHeading>
        <StyledSubheading>
          {city} {street}
        </StyledSubheading>
        <StyledDescription>{description}</StyledDescription>

        <StyledPriceWrapper container alignItems="center">
          <StyledDate>
            <StyledMonth>{format(date, "MMM")}</StyledMonth>
            {format(date, "d")}
          </StyledDate>
          <StyledPrice>
            {localizePrice(price.price, price.locale, price.currency)}
          </StyledPrice>
        </StyledPriceWrapper>
      </StyledCardContent>
    </Card>
  );
};

export default EventCard;
