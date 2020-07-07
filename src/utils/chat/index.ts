/* eslint-disable @typescript-eslint/no-unsafe-return */
import auth from '@react-native-firebase/auth';

import { UserPreviewChat } from '~/models/user';

export const getIdOtherUserByChat = (chat: unknown): string => {
  if (!chat) {
    return '';
  }

  const userLoggedId = auth().currentUser?.uid;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return chat.usersIds[userLoggedId].id;
};

export const getOtherUserPreviewChat = (chat: unknown): UserPreviewChat => {
  const userLoggedId = auth().currentUser?.uid;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return chat.usersIds[userLoggedId];
};
