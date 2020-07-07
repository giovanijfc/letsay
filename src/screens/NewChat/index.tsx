/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import ProfileItem from '~/components/molecules/ProfileItem';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input';
import CenterLoader from '~/components/atoms/CenterLoader';

import { getAllUsersRequest } from '~/redux/actions/users';

import database from '~/services/firebase/database';

import SPACING from '~/utils/spacing';

import { RootState } from '~/redux/reducers';
import { User } from '~/models/user';
import { Chat } from '~/models/chat';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const NewMessage: React.FC = () => {
  const [name, setName] = useState('');
  const [usersFindByName, setUsersFindByName] = useState<User[]>([]);

  const {
    users: { getAllUsers }
  } = useSelector((state: RootState) => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAllUsersRequest());
  }, []);

  useLayoutEffect(() => {
    if (name.length > 0) {
      const filteredUserUpdate: User[] = getAllUsers.success?.filter(user =>
        user.username.includes(name)
      );

      setUsersFindByName(filteredUserUpdate);
    }
  }, [name]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onPressProfileItemHandler = async (uid: string) => {
    const userLoggedId: string | undefined = auth().currentUser?.uid;
    await database.chat.createChat([uid, userLoggedId || '']);
    const chats = await database.chat.getChatsByIdUser(userLoggedId || '');
    const chatToRedirect: Chat | unknown = chats.find(
      chat => chat.usersIds[userLoggedId].id === uid
    );

    navigation.navigate('Chat', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      otherUser: chatToRedirect.usersIds[userLoggedId]
    });
  };

  if (getAllUsers.isLoading) {
    return <CenterLoader />;
  }

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <TouchableOpacity onPress={handleBack}>
          <IconAntDesign size={32} color='white' name='close' />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: SPACING.high,
            marginBottom: SPACING.default
          }}
          color='white'
          semiBold
          extraBig
        >
          Novo chat
        </Text>

        <Input
          defaultValue={name}
          onChange={newName => setName(newName)}
          placeholder='Busque pelo nome...'
          style={{ marginBottom: SPACING.default, marginTop: SPACING.small }}
        />

        <FlatList
          data={name.length > 0 ? usersFindByName : getAllUsers.success}
          renderItem={({ item }) => (
            <ProfileItem
              onPress={onPressProfileItemHandler}
              name={item.username}
              uid={item.id}
            />
          )}
        />
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default NewMessage;
