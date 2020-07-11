export interface Notification {
  data: Data;
  notification: NotificationData;
}

interface Data {
  notification: NotificationData;
}

interface NotificationData {
  body?: string | '';
  title?: string | '';
}
