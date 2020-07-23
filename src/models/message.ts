export interface LastMessagePreview {
  message: string;
  date: string;
  userId: string;
  username?: string | '';
  isVisualized: boolean;
}

export interface UpdateLastMessagePreview {
  message?: string;
  date?: string;
  userId?: string;
  username?: string | '';
  isVisualized?: boolean;
}

export interface Message {
  id?: string | '';
  message: string;
  date: string;
  userId: string;
  chatId: string;
}
