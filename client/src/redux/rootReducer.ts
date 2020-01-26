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

export interface IState {
  localization: ILocalizationReducerState;
  user: IUserReducerState;
  events: IEventsReducerState;
  eventDetail: IEventDetailReducerState;
  application: IApplicationReducerState;
  notifications: INotificationReducerState;
}

export default combineReducers({
  localization: localizationReducer,
  user: userReducer,
  events: eventsReducer,
  eventDetail: eventDetailReducer,
  application: applicationReducer,
  notifications: notificationsReducer
});
