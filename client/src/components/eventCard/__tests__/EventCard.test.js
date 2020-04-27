import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import EventCard from "../EventCard";
import { renderWithRedux } from "utils/test";
import { getMockedEvents } from "utils/testing-events-mock";

const event = getMockedEvents()[2];

describe("<EventCard>", () => {
  afterEach(() => {
    cleanup();
  });

  test("Render without error with correct props", () => {
    const { getByTestId } = renderWithRedux(<EventCard event={event} />);
    const eventCard = getByTestId("event-card");
    expect(eventCard).toBeTruthy();
  });

  test("Render price for FREE event correctly", () => {
    const freeEvent = {
      ...event,
      price: {
        ...event.price,
        price: 0,
      },
    };
    const { getByTestId } = renderWithRedux(<EventCard event={freeEvent} />);
    const Price = getByTestId("event-card-price");

    expect(Price.textContent).toBe("FREE");
  });

  test("Render price for event with price correctly", () => {
    // There is unit test for localizePrice helper function, so I am testing here
    // only if component logic is correct not every possible scenario of price formatting
    const eventWithPrice = {
      ...event,
      price: {
        ...event.price,
        currency: "EUR",
        locale: "en",
        price: 22222,
      },
    };
    const { getByTestId } = renderWithRedux(
      <EventCard event={eventWithPrice} />
    );
    const price = getByTestId("event-card-price");
    expect(price.textContent).toBe("€22,222.00");
  });

  test("Render event date correctly", () => {
    const eventWithCustomDate = {
      ...event,
      date: 1604916480000,
    };

    const { getByTestId } = renderWithRedux(
      <EventCard event={eventWithCustomDate} />
    );
    const Date = getByTestId("event-card-date");
    expect(Date.textContent).toBe("Nov9");
  });

  test("Render event name", () => {
    const { getByTestId } = renderWithRedux(<EventCard event={event} />);
    const EventName = getByTestId("event-card-name");
    expect(EventName.textContent).toBe(event.name);
  });

  test("Render event description", () => {
    const { getByTestId } = renderWithRedux(<EventCard event={event} />);
    const EventDescription = getByTestId("event-card-description");
    expect(EventDescription.textContent).toMatch(event.description);
  });
});
