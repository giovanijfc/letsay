import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import RNdatabase from '@react-native-firebase/database';

import ChatItem from '~/components/molecules/ChatItem';

import Text from '~/components/atoms/Text';
import CenterLoader from '~/components/atoms/CenterLoader';

import {
  getAllChatsByIdUserRequest,
  onUpdateChatServiceStart,
  onAddNewChatServiceStart
} from '~/redux/actions/chats';

import COLORS from '~/utils/colors';
import { getOtherUserPreviewChat } from '~/utils/chat';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import { RootState } from '~/redux/reducers';
import { Chat } from '~/models/chat';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
void MaterialCommunityIcons.loadFont();

const Chats: React.FC = () => {
  const { chats } = useSelector((state: RootState) => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const userLoggedId = auth().currentUser?.uid || '';
    dispatch(getAllChatsByIdUserRequest(userLoggedId));

    dispatch(onAddNewChatServiceStart(userLoggedId));
    dispatch(onUpdateChatServiceStart(userLoggedId));

    return () => {
      RNdatabase().ref('/chats').off();
    };
  }, []);

  const onClickNewMessageHandler = () => {
    navigation.navigate('NewChat');
  };

  const onPressChatItemHandler = (otherUser: unknown, chat: Chat) => {
    navigation.navigate('Chat', {
      otherUser,
      chat
    });
  };

  const getChatsByOrderLastMessage = () => {
    const chatsToSort: Chat[] = chats.getAllChatsByIdUser.success || [];

    return chatsToSort.sort((a, b) => {
      if (!a.lastMessage.date) {
        return 1;
      }

      if (!b.lastMessage.date) {
        return 0;
      }

      if (a.lastMessage.date < b.lastMessage.date) {
        return 1;
      } else if (b.lastMessage.date < a.lastMessage.date) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Styled.AreaHeader>
          <Text color='white' semiBold>
            Mensagens
          </Text>

          <IconAntDesign
            name='plus'
            onPress={onClickNewMessageHandler}
            color={COLORS.primary}
            size={34}
          />
        </Styled.AreaHeader>
        {chats.getAllChatsByIdUser.isLoading ? (
          <CenterLoader />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  marginTop: SPACING.default
                }}
                color={COLORS.gray400}
                extraRegular
              >
                Nenhum chat encontrado. :/
              </Text>
            }
            data={getChatsByOrderLastMessage()}
            renderItem={({ item }) => {
              const otherUser = getOtherUserPreviewChat(item);

              return (
                <ChatItem
                  lastMessage={item.lastMessage}
                  onPress={onPressChatItemHandler}
                  otherUser={otherUser}
                  chat={item}
                />
              );
            }}
          />
        )}
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Chats;
