import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "@testing-library/react";
import EventCard from "../EventCard";
import { renderWithRedux } from "utils/test";

afterEach(() => {
  cleanup();
});

const event = {
  _id: "5e0dc1f3adec140017cadac7",
  name: "Art Battle New York",
  description: "Art Battle New York at Le Poisson Rouge",
  date: 1604916480000,
  imageUrl:
    "https://local-events-react.s3.us-east-2.amazonaws.com/2020-01-02T10%3A12%3A02.739Z-art-battle-ny.jpg",
  price: {
    price: 0,
    currency: "EUR",
    locale: "en"
  },
  address: {
    street: "Radlinskeho 34",
    postalCode: "81710",
    city: "Bratislava",
    countryCode: "SK",
    country: "SM"
  },
  owner: {}
};

describe("<EventCard>", () => {
  test("Render without error with correct props", () => {
    const { getByTestId } = renderWithRedux(<EventCard event={event} />);
    const eventCard = getByTestId("event-card");
    expect(eventCard).toBeTruthy();
  });

  test("Render price", () => {
    const { getByTestId } = renderWithRedux(<EventCard event={event} />);
    const price = getByTestId("event-card-price");
    expect(price).toBeTruthy();
  });
});
