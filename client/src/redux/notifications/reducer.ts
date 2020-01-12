import {
  PUSH_NOTIFICATION_TO_STACK,
  POP_NOTIFICATION_FROM_STACK
} from "redux/notifications/constants";
import { INotificationReducerState, NotificationReducerTypes } from "./types";

const defaultState: INotificationReducerState = {
  list: []
};

function notificationReducer(
  state: INotificationReducerState = defaultState,
  action: NotificationReducerTypes
) {
  switch (action.type) {
    case PUSH_NOTIFICATION_TO_STACK:
      return {
        ...state,
        list: [...state.list, action.payload.notification]
      };

    case POP_NOTIFICATION_FROM_STACK:
      return {
        ...state,
        list: state.list.filter(
          notification => notification.id !== action.payload.id
        )
      };

    default:
      return state;
  }
}

export default notificationReducer;
