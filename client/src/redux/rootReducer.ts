import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/reducers";
import eventDetailReducer from "redux/eventDetail/reducers";
import eventsReducer from "redux/events/reducers";
import localizationReducer from "redux/localization/reducers";
import applicationReducer from "redux/application/reducers";
// Reducers Types
import { IEventsReducerState } from "redux/events/reducers";
import { IEventDetailReducerState } from "redux/eventDetail/types";
import { ILocalizationReducerState } from "redux/localization/types";
import { IApplicationReducerState } from "redux/application/types";

export interface IState {
  localization: ILocalizationReducerState;
  user: any;
  events: IEventsReducerState;
  eventDetail: IEventDetailReducerState;
  application: IApplicationReducerState;
}

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer,
  eventDetail: eventDetailReducer,
  application: applicationReducer
});
