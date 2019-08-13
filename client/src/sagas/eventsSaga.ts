import { takeLatest, put } from "redux-saga/effects";
import { actionTypes as eventsActionTypes } from "actions/eventsActions";

// Actions
import { fetchEventsSuccess } from "actions/eventsActions";

// @TODO - connet to backend whne it will be ready
const mockedEvents = [
  {
    id: "1",
    name: "Citi Taste of Tennis",
    description: `As a premier lifestyle event on the tennis tour, Citi Taste of Tennis offers foodies and tennis fans an evening of signature cuisine prepared by top chefs paired with some of the world’s best tennis players. Guests will enjoy an unforgettable evening sampling fine food, sipping signature cocktails and fine wines, and mingling with their favorite tennis players. Along with great music, the event features a 360-degree photo booth, an exciting cooking demonstration, past Citi Taste of Tennis players and chefs, and a number of other surprises.  A portion of the proceeds raised benefit New York Junior Tennis and Learning. Tickets to the event are $300 and include unlimited food and drink throughout the evening. Citi clients are eligible to receive a 15 percent discount on general admission tickets. Group discounts are also available.`,
    imageUrl: "https://cdn2.allevents.in/thumbs/thumb5d44d8a5c26d2.png",
    location: "Podjavirinskej 34 Trnava",
    images: [],
    attendants: [],
    similiarEvents: [],
    category: "Party",
    city: "Trnava",
    tags: ["fun", "friends", "party"],
    map: "48.3721682,17.5927168",
    date: new Date().getTime(),
    socialLinks: {
      facebook: ""
    }
  }
];

function* fetchEventsWatcher({ meta, payload }: any) {
  yield put(fetchEventsSuccess(mockedEvents));
}

export default function* userSaga() {
  yield takeLatest(eventsActionTypes.FETCH_EVENTS, fetchEventsWatcher);
}
