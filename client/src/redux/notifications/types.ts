import {
  PUSH_NOTIFICATION_TO_STACK,
  POP_NOTIFICATION_FROM_STACK
} from "./constants";

export interface INotification {
  text: string;
  id: string;
}

export interface INotificationReducerState {
  list: INotification[];
}

export interface PushNotificationToStackAction {
  type: typeof PUSH_NOTIFICATION_TO_STACK;
  payload: { notification: { id: string; text: string } };
}

export interface PopNotificationFromStackAction {
  type: typeof POP_NOTIFICATION_FROM_STACK;
  payload: { id: string };
}

export type NotificationReducerTypes =
  | PushNotificationToStackAction
  | PopNotificationFromStackAction;
