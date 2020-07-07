import { LastMessagePreview } from './message';

export interface Chat {
  id: string;
  lastMessage: LastMessagePreview;
  usersIds: unknown;
}
