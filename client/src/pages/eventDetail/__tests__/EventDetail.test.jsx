import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
import EventDetail from "../EventDetail";
import { renderWithRedux } from "utils/test";
import axiosMock, { resetMock } from "axios";
import { getMockedEvents } from "utils/testing-events-mock";

const event = getMockedEvents(1)[0];

const match = {
  params: {
    id: "wdwadwadwa",
  },
};

describe("<EventDetail>", () => {
  beforeEach(() => {
    const { get } = axiosMock.instance;
    get.mockImplementation(() => {
      return Promise.resolve({ data: { event } });
    });
  });
  afterEach(() => {
    resetMock();
    cleanup();
  });

  it("Render without error with correct props", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const Detail = await waitForElement(() => getByTestId("event-detail"));
    expect(Detail).toBeTruthy();
  });

  it("Hide Loading and show Component when data come", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const Loading = await waitForElement(() => getByTestId("loading"));
    expect(Loading).toBeTruthy();

    const Detail = await waitForElement(() => getByTestId("event-detail"));

    expect(Detail).toBeTruthy();
  });

  it("Should display event heading", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const Heading = await waitForElement(() => getByTestId("event-heading"));
    expect(Heading.textContent).toBe(event.name);
  });

  it("Should display event description", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const Description = await waitForElement(() =>
      getByTestId("event-description")
    );
    expect(Description.textContent).toBe(event.description);
  });

  it("Should display sidebar", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const SideBar = await waitForElement(() => getByTestId("sidebar"));
    expect(SideBar).toBeTruthy();
  });

  it("Should display sidebar title correctly", async () => {
    const { findByText } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const SideBarTitle = await waitForElement(() =>
      findByText(`More events in ${event.address.city}`)
    );
    expect(SideBarTitle.textContent).toBe(
      `More events in ${event.address.city}`
    );
  });

  it("Should display tags correctly", async () => {
    const { getByTestId } = renderWithRedux(
      <EventDetail history={{}} location={{}} match={match} />
    );

    const EventTags = await waitForElement(() => getByTestId("event-tags"));
    expect(EventTags.childElementCount).toBe(3);

    EventTags.childNodes.forEach((node, index) =>
      expect(node.querySelector("span").textContent).toBe(event.tags[index])
    );
  });
});
