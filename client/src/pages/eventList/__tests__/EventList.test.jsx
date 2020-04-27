import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
import EventList from "../EventList";
import { renderWithRedux } from "utils/test";
import axiosMock, { resetMock } from "axios";
import { getMockedEvents } from "utils/testing-events-mock";

const events = getMockedEvents();
const match = {
  params: {},
};

describe("<EventList>", () => {
  beforeEach(() => {
    const { get } = axiosMock.instance;
    get.mockImplementation(() => {
      return Promise.resolve({
        data: {
          events,
          message: "Fetched events successfully.",
          totalItems: events.length,
        },
      });
    });
  });

  afterEach(() => {
    resetMock();
    cleanup();
  });

  it("Render without error", async () => {
    const { getByTestId } = renderWithRedux(
      <EventList history={{}} location={{}} match={match} />
    );

    const EventListComponent = await waitForElement(() =>
      getByTestId("event-list")
    );
    expect(EventListComponent).toBeTruthy();
  });

  it("Render heading", async () => {
    const { getByTestId } = renderWithRedux(
      <EventList history={{}} location={{}} match={match} />
    );
    const Heading = await waitForElement(() => getByTestId("heading"));

    expect(Heading.textContent).toMatch(/Popular Events in /);
  });

  it("Render correct number of event cards", async () => {
    const { getByTestId } = renderWithRedux(
      <EventList history={{}} location={{}} match={match} />
    );
    const EventListComponent = await waitForElement(() =>
      getByTestId("event-list-cards")
    );

    expect(EventListComponent.childElementCount).toBe(10);
  });

  it("Render pagination", async () => {
    const { getByTestId } = renderWithRedux(
      <EventList history={{}} location={{}} match={match} />
    );
    const Pagination = await waitForElement(() =>
      getByTestId("event-list-pagination")
    );

    expect(Pagination).toBeTruthy();
  });

  it("Render no events message if there are no events", async () => {
    resetMock();
    const { get } = axiosMock.instance;
    get.mockImplementation(() => {
      return Promise.resolve({
        data: {
          events: [],
          message: "Fetched events successfully.",
          totalItems: 0,
        },
      });
    });

    const { getByTestId } = renderWithRedux(
      <EventList history={{}} location={{}} match={match} />
    );
    const NoEventMessage = await waitForElement(() =>
      getByTestId("no-events-message")
    );

    expect(NoEventMessage).toBeTruthy();
  });
});
