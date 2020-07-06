import database from '@react-native-firebase/database';

export const getChatByIdUser = (uid: string): string => {
  return '';
};

export const createChat = async (usersIds: string[]): Promise<void> => {
  const chat = database().ref('/chats').push();

  await chat.set({
    usersIds,
    id: chat.key
  });
};
