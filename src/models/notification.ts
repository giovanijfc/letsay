export interface Notification {
  data: Data;
}

interface Data {
  body?: string | '';
  title?: string | '';
  chatId?: string | '';
}
