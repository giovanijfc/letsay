import { LastMessagePreview } from './message';

export interface Chat {
  id: string;
  dateCreated: string;
  lastMessage: LastMessagePreview;
  usersIds: unknown;
  created?: boolean | false;
}
