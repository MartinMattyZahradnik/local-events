import { combineReducers } from "redux";

import userReducer from "reducers/userReducer";
import eventsReducer from "reducers/eventsReducer";
import localizationReducer from "reducers/localizationReducer";

// Reducers Types
import { ILocalizationReducerState } from "reducers/localizationReducer";
import { IEventsReducerState } from "reducers/eventsReducer";

export interface IState {
  localization: ILocalizationReducerState;
  user: any;
  events: IEventsReducerState;
}

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer
});
