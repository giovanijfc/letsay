export interface LastMessagePreview {
  message: string;
  date: string;
  userId: string;
}

export interface Message {
  id?: string | '';
  message: string;
  date: string;
  userId: string;
  chatId: string;
}
