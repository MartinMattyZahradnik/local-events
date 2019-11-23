import { IAction } from "redux/action";
import { actionTypes as notificationsActionTypes } from "redux/notifications/constants";
import { INotificationReducerState } from "./types";

const defaultState: INotificationReducerState = {
  list: []
};

function notificationReducer(
  state: INotificationReducerState = defaultState,
  { type, payload }: any
) {
  switch (type) {
    case notificationsActionTypes.PUSH_NOTIFICATION_TO_STACK:
      return {
        ...state,
        list: [...state.list, payload.notification]
      };

    case notificationsActionTypes.POP_NOTIFICATION_FROM_STACK:
      return {
        ...state,
        list: state.list.filter(notification => notification.id !== payload.id)
      };

    default:
      return state;
  }
}

export default notificationReducer;
