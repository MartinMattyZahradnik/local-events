import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/reducers";
import eventsReducer from "redux/events/reducers";
import localizationReducer from "redux/localization/reducers";

// Reducers Types
import { ILocalizationReducerState } from "redux/localization/types";
import { IEventsReducerState } from "redux/events/reducers";

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
