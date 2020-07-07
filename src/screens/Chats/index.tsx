import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import ChatItem from '~/components/molecules/ChatItem';

import FloatingButton from '~/components/atoms/FloatingButton';
import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getChatsByIdUser } from '~/services/firebase/database/chat';
import { Chat } from '~/models/chat';
import { FlatList } from 'react-native';
import { getOtherUserPreviewChat } from '~/utils/chat';
void MaterialCommunityIcons.loadFont();

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[] | undefined>(undefined);

  const navigation = useNavigation();

  useEffect(() => {
    void getChatsRequest();
  }, []);

  useLayoutEffect(() => {
    console.log(chats);
  }, [chats]);

  const getChatsRequest = async () => {
    const userLoggedId: string | undefined = auth().currentUser?.uid;

    const chats = await getChatsByIdUser(userLoggedId || '');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setChats(chats);
  };

  const onClickNewMessageHandler = () => {
    navigation.navigate('NewChat');
  };

  const onClickSignoutHandler = async () => {
    await auth().signOut();
  };

  const onPressChatItemHandler = (otherUser: unknown) => {
    navigation.navigate('Chat', {
      otherUser
    });
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Styled.AreaHeader>
          <Text color='white' semiBold>
            Mensagens
          </Text>

          <MaterialCommunityIcons
            name='logout'
            color={COLORS.primary}
            size={34}
            onPress={onClickSignoutHandler}
          />
        </Styled.AreaHeader>

        <FlatList
          data={chats}
          renderItem={({ item }) => {
            const otherUser = getOtherUserPreviewChat(item);

            return (
              <ChatItem
                lastMessage={item.lastMessage}
                onPress={onPressChatItemHandler}
                otherUser={otherUser}
              />
            );
          }}
        />

        <FloatingButton
          style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          bottom={20}
          right={15}
          onPress={onClickNewMessageHandler}
        >
          <IconAntDesign name='plus' color={COLORS.secondary} size={34} />
        </FloatingButton>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Chats;
