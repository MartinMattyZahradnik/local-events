export interface INotification {
  text: string;
  id: string;
}

export interface INotificationReducerState {
  list: INotification[];
}
