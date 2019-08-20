import { combineReducers } from "redux";

import userReducer from "reducers/userReducer";
import eventsReducer from "reducers/eventsReducer";
import localizationReducer from "reducers/localizationReducer";

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer
});
