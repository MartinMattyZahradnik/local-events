import uuid from "uuid/v4";
import {
  PUSH_NOTIFICATION_TO_STACK,
  POP_NOTIFICATION_FROM_STACK
} from "./constants";
import {
  PushNotificationToStackAction,
  PopNotificationFromStackAction
} from "./types";

export const pushNotificationToStack = (
  notification: string
): PushNotificationToStackAction => ({
  type: PUSH_NOTIFICATION_TO_STACK,
  payload: { notification: { id: uuid(), text: notification } }
});

export const popNotificationFromStack = (
  id: string
): PopNotificationFromStackAction => ({
  type: POP_NOTIFICATION_FROM_STACK,
  payload: { id }
});
