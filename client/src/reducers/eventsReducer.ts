import { combineReducers } from "redux";

import { actionTypes as eventsActions } from "actions/eventsActions";

function error(state = false, { type, payload }: any) {
  switch (type) {
    case eventsActions.FETCH_EVENTS_ERROR:
      return payload;

    case eventsActions.FETCH_EVENTS:
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return false;

    default:
      return state;
  }
}

function result(state = [], { type, payload }: any) {
  switch (type) {
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return payload;

    default:
      return state;
  }
}

function isLoading(state = false, { type }: any) {
  switch (type) {
    case eventsActions.FETCH_EVENTS:
      return true;

    default:
      return false;
  }
}

export default combineReducers({ error, result, isLoading });
