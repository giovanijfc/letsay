import RNdatabase from '@react-native-firebase/database';

import { Chat } from '~/models/chat';
import database from '~/services/firebase/database';

export const getChatsByIdUser = async (
  userLoggedId: string
): Promise<Chat[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chats: Chat[] = await RNdatabase()
    .ref('/chats')
    .orderByChild(`usersIds/${userLoggedId}`)
    .once('value')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(snapshot => snapshot.val());

  return chats ? Object.values(chats) : [];
};

export const createChat = async (usersIds: string[]): Promise<void> => {
  let containsChat: Chat[] | Chat | undefined = await getChatsByIdUser(
    usersIds[1]
  );

  containsChat = containsChat.find(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    chat => chat.usersIds[usersIds[1]].id === usersIds[0]
  );

  if (containsChat) {
    return;
  }

  const chat = RNdatabase().ref('/chats').push();

  const user0 = await database.user.getById(usersIds[0]);
  delete user0.email;
  const user1 = await database.user.getById(usersIds[1]);
  delete user1.email;

  await chat.set({
    usersIds: {
      [usersIds[0]]: user1,
      [usersIds[1]]: user0
    },
    id: chat.key,
    lastMessage: ''
  });
};
