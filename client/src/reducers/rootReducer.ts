import { combineReducers } from "redux";

import userReducers from "reducers/userReducer";
import eventsReducers from "reducers/eventsReducer";

export default combineReducers({
  user: userReducers,
  events: eventsReducers
});
