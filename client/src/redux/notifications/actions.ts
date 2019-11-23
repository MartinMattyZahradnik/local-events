import { actionTypes } from "./constants";
import { INotification } from "./types";

export const pushNotificationToStack = (notification: INotification) => ({
  type: actionTypes.PUSH_NOTIFICATION_TO_STACK,
  payload: { notification }
});

export const popNotificationFromStack = (id: string) => ({
  type: actionTypes.POP_NOTIFICATION_FROM_STACK,
  payload: { id }
});
