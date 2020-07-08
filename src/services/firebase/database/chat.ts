import RNdatabase from '@react-native-firebase/database';

import database from '~/services/firebase/database';

import { Chat } from '~/models/chat';
import { Message } from '~/models/message';

export const getChatsByIdUser = async (
  userLoggedId: string
): Promise<Chat[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const chats: Chat[] = await RNdatabase()
    .ref('/chats')
    .orderByChild(`/usersIds/${userLoggedId}/userLoggedId/`)
    .equalTo(userLoggedId)
    .once('value')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then(snapshot => snapshot.val());

  return chats ? Object.values(chats) : [];
};

export const createChat = async (usersIds: string[]): Promise<Chat> => {
  let containsChat: Chat[] | Chat | undefined = await getChatsByIdUser(
    usersIds[1]
  );

  containsChat = containsChat.find(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    chat => chat.usersIds[usersIds[1]].id === usersIds[0]
  );

  if (containsChat) {
    return {
      ...containsChat,
      created: false
    };
  }

  const chats = RNdatabase().ref('/chats').push();

  const user0 = await database.user.getById(usersIds[0]);
  delete user0.email;
  const user1 = await database.user.getById(usersIds[1]);
  delete user1.email;

  const chatCreated: Chat = {
    usersIds: {
      [usersIds[0]]: { ...user1, userLoggedId: user0.id },
      [usersIds[1]]: { ...user0, userLoggedId: user1.id }
    },
    id: String(chats.key),
    lastMessage: {
      message: 'Inicie a conversa...',
      date: '',
      userId: ''
    }
  };

  await chats.set(chatCreated);

  return { ...chatCreated, created: true };
};

export const updateLastChatMessage = async (
  chatId: string,
  message: Message
): Promise<void> => {
  const chatById = RNdatabase().ref(`/chats/${chatId}`);
  await chatById.update({ lastMessage: message });
};
