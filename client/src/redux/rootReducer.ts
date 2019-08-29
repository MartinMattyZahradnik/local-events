import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/reducers";
import eventDetailReducer from "redux/eventDetail/reducers";
import eventsReducer from "redux/events/reducers";
import localizationReducer from "redux/localization/reducers";

// Reducers Types
import { IEventsReducerState } from "redux/events/reducers";
import { IEventDetailReducerState } from "redux/eventDetail/types";
import { ILocalizationReducerState } from "redux/localization/types";
export interface IState {
  localization: ILocalizationReducerState;
  user: any;
  events: IEventsReducerState;
  eventDetail: IEventDetailReducerState;
}

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer,
  eventDetail: eventDetailReducer
});
