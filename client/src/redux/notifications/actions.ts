import uuid from "uuid/v4";
import { actionTypes } from "./constants";

export const pushNotificationToStack = (notification: string) => ({
  type: actionTypes.PUSH_NOTIFICATION_TO_STACK,
  payload: { notification: { id: uuid(), text: notification } }
});

export const popNotificationFromStack = (id: string) => ({
  type: actionTypes.POP_NOTIFICATION_FROM_STACK,
  payload: { id }
});
