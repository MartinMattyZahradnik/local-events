import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";
import { INotification } from "./types";

const getNotifications = (state: IState) => state.notifications;

export const selectNotificationList = createSelector(
  [getNotifications],
  (notifications): INotification[] => notifications.list
);
