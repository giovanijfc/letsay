import database from '@react-native-firebase/database';

import { Chat } from '~/models/chat';

export const getChatsByIdUser = async (
  userLoggedId: string
): Promise<Chat[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chats: Chat[] = await database()
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
    chat => chat.usersIds[usersIds[1]] === usersIds[0]
  );

  if (containsChat) {
    return;
  }

  const chat = database().ref('/chats').push();

  await chat.set({
    usersIds: {
      [usersIds[0]]: usersIds[1],
      [usersIds[1]]: usersIds[0]
    },
    id: chat.key,
    lastMessage: ''
  });
};
