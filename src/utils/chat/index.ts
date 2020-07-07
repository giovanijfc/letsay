import auth from '@react-native-firebase/auth';

import { Chat } from '~/models/chat';

export const getIdOtherUserByChat = (chat: Chat | undefined): string => {
  if (!chat) {
    return '';
  }

  const userLoggedId = auth().currentUser?.uid;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return chat?.usersIds[userLoggedId];
};
