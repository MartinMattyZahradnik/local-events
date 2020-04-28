import React from "react";

import { cleanup, fireEvent } from "@testing-library/react";
import EventForm from "../EventForm";
import { renderWithRedux } from "utils/test";
import { getMockedEvents } from "utils/testing-events-mock";
import axiosMock, { resetMock } from "axios";

const emptyEvent = {
  name: "",
  description: "",
  imageUrl: "",
  date: Date.now(),
  category: [],
  price: 0,
  tags: "",
  address: {
    street: "",
    postalCode: "",
    city: "",
    countryCode: "",
    country: "",
  },
};

const event = getMockedEvents()[0];

describe("<EventForm>", () => {
  const countries = [
    {
      code: "US",
      name: "United States",
      states: [{ code: "AE", name: "Armed Forces" }],
    },
  ];

  beforeEach(() => {
    const { get } = axiosMock.instance;
    get.mockImplementation(() => {
      return Promise.resolve({
        data: { result: countries, message: "success" },
      });
    });
  });

  afterEach(() => {
    resetMock();
    cleanup();
  });

  test("Render without error with correct props", () => {
    const { getByTestId } = renderWithRedux(
      <EventForm
        {...emptyEvent}
        actionButtonLabel="create"
        formHeading="Create Event"
      />
    );
    const EventFormComponent = getByTestId("event-form");
    expect(EventFormComponent).toBeTruthy();
  });

  test("Pre-fill form inputs with existing event data", () => {
    const { getByTestId } = renderWithRedux(
      <EventForm
        {...event}
        actionButtonLabel="create"
        formHeading="Create Event"
      />
    );
    const Form = getByTestId("event-form");
    const NameInput = Form.querySelector("[name='name']");
    const CategoryInput = Form.querySelector("[name='category']");
    const DescriptionInput = Form.querySelector("[name='description']");
    const StreetInput = Form.querySelector("[name='address.street']");
    const PostalCodeInput = Form.querySelector("[name='address.postalCode']");
    const AddressCityInput = Form.querySelector("[name='address.city']");
    const TagsInput = Form.querySelector("[name='tags']");

    expect(NameInput.value).toBe(event.name);
    expect(CategoryInput.value).toBe(event.category.join(","));

    expect(DescriptionInput.value).toBe(event.description);
    expect(StreetInput.value).toBe(event.address.street);
    expect(PostalCodeInput.value).toBe(event.address.postalCode);
    expect(AddressCityInput.value).toBe(event.address.city);
    expect(TagsInput.value).toBe(event.tags.join(","));
  });

  test("Submit form with correct data", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());

    const { getByTestId } = renderWithRedux(
      <EventForm
        {...event}
        onSubmit={handleSubmit}
        actionButtonLabel="create"
        formHeading="Create Event"
      />
    );
    const Form = getByTestId("event-form");
    const SubmitBtn = getByTestId("event-form-submit");

    const NameInput = Form.querySelector("[name='name']");
    fireEvent.change(NameInput, { target: { value: event.name } });

    const CategoryInput = Form.querySelector("[name='category']");
    fireEvent.change(CategoryInput, {
      target: { value: event.category.join(",") },
    });

    const DescriptionInput = Form.querySelector("[name='description']");
    fireEvent.change(DescriptionInput, {
      target: { value: event.description },
    });

    const StreetInput = Form.querySelector("[name='address.street']");
    fireEvent.change(StreetInput, { target: { value: event.address.street } });

    const PostalCodeInput = Form.querySelector("[name='address.postalCode']");
    fireEvent.change(PostalCodeInput, {
      target: { value: event.address.postalCode },
    });

    const AddressCityInput = Form.querySelector("[name='address.city']");
    fireEvent.change(AddressCityInput, {
      target: { value: event.address.city },
    });

    const TagsInput = Form.querySelector("[name='tags']");
    fireEvent.change(TagsInput, {
      target: { value: event.tags.join(",") },
    });

    fireEvent.click(SubmitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
