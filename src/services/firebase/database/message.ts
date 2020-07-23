import RNdatabase from '@react-native-firebase/database';

import database from '~/services/firebase/database';

import { Message } from '~/models/message';

export const createMessage = async (newMessage: Message): Promise<void> => {
  const messages = RNdatabase().ref('/messages').push();
  const chatId = newMessage.chatId;

  await messages.set({ ...newMessage, id: messages.key });

  delete newMessage['chatId'];

  await database.chat.updateLastChatMessage(chatId, {
    ...newMessage,
    isVisualized: false
  });
};
