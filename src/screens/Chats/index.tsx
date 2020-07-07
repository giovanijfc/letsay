import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import RNdatabase, {
  FirebaseDatabaseTypes
} from '@react-native-firebase/database';

import ChatItem from '~/components/molecules/ChatItem';

import FloatingButton from '~/components/atoms/FloatingButton';
import Text from '~/components/atoms/Text';
import CenterLoader from '~/components/atoms/CenterLoader';

import {
  getAllChatsByIdUserRequest,
  onAddNewChat
} from '~/redux/actions/chats';

import COLORS from '~/utils/colors';
import { getOtherUserPreviewChat } from '~/utils/chat';

import * as Styled from './styles';

import { RootState } from '~/redux/reducers';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
void MaterialCommunityIcons.loadFont();

let chatAddListeningCreated: string | undefined = undefined;

const Chats: React.FC = () => {
  const { chats } = useSelector((state: RootState) => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const userLoggedId = auth().currentUser?.uid;
    dispatch(getAllChatsByIdUserRequest(userLoggedId || ''));

    RNdatabase()
      .ref('/chats')
      .orderByChild(`/usersIds/${userLoggedId || ''}`)
      .on('child_added', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
        if (chatAddListeningCreated) {
          dispatch(onAddNewChat(snapshot.val()));
        }

        chatAddListeningCreated = 'CREATED';
      });

    return () => {
      RNdatabase().ref('/chats').off();
    };
  }, []);

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
        {chats.getAllChatsByIdUser.isLoading ? (
          <CenterLoader />
        ) : (
          <>
            <FlatList
              data={chats.getAllChatsByIdUser.success}
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
          </>
        )}
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Chats;
