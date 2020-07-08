import RNdatabase from '@react-native-firebase/database';

import database from '~/services/firebase/database';

import { Message } from '~/models/message';

export const createMessage = async (message: Message): Promise<void> => {
  const messages = RNdatabase().ref('/messages').push();
  const chatId = message.chatId;

  await messages.set({ ...message, id: messages.key });

  delete message['chatId'];

  await database.chat.updateLastChatMessage(chatId, message);
};
