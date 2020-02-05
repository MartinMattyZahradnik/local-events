import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
import { MemoryRouter } from "@testing-library/react";
import EventDetail from "../EventDetail";
import { renderWithRedux } from "utils/test";
import "jest-fetch-mock";

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

global.fetch = require("jest-fetch-mock");

const match = {
  params: {
    id: "wdwadwadwa"
  }
};

describe.only("<EventDetail>", () => {
  test("Render without error with correct props", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ event, message: "Fetch event successful" })
    );
    const { getByTestId, debug } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );
    debug();
    console.log("--------------------");
    await waitForElement(() => getByTestId("event-detail"));
    debug();

    // const eventCard = getByTestId("event-detail");
    // expect(eventCard).toBeTruthy();
  });
});
