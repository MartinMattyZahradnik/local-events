import { combineReducers } from "redux";

// Reducers
import userReducer from "redux/user/reducers";
import eventDetailReducer from "redux/eventDetail/reducers";
import eventsReducer from "redux/events/reducers";
import localizationReducer from "redux/localization/reducers";
import applicationReducer from "redux/application/reducers";
import notificationsReducer from "redux/notifications/reducer";

// Reducers Types
import { IEventsReducerState } from "redux/events/types";
import { IEventDetailReducerState } from "redux/eventDetail/types";
import { ILocalizationReducerState } from "redux/localization/types";
import { IApplicationReducerState } from "redux/application/types";
import { INotificationReducerState } from "redux/notifications/types";
import { IUserReducerState } from "redux/user/types";

// Default states
import { defaultState as localizationDefaultState } from "./localization/reducers";
import { defaultState as notificationsDefaultState } from "./notifications/reducer";
import { defaultState as userDefaultState } from "./user/reducers";
import { defaultState as eventsDefaultState } from "./events/reducers";
import { defaultState as eventDetailDefaultState } from "./eventDetail/reducers";
import { defaultState as applicationDefaultState } from "./application/reducers";

export interface IState {
  localization: ILocalizationReducerState;
  user: IUserReducerState;
  events: IEventsReducerState;
  eventDetail: IEventDetailReducerState;
  application: IApplicationReducerState;
  notifications: INotificationReducerState;
}

export const initialState: IState = {
  localization: localizationDefaultState,
  user: userDefaultState,
  events: eventsDefaultState,
  eventDetail: eventDetailDefaultState,
  application: applicationDefaultState,
  notifications: notificationsDefaultState
};

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer,
  eventDetail: eventDetailReducer,
  application: applicationReducer,
  notifications: notificationsReducer
});
