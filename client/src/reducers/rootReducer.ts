import { combineReducers } from "redux";

import userReducers from "reducers/userReducer";
import eventsReducers from "reducers/eventsReducer";
import localizationReducer from "reducers/localizationReducer";

export default combineReducers({
  localization: localizationReducer,
  user: userReducers,
  events: eventsReducers
});
