/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import ProfileItem from '~/components/molecules/ProfileItem';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input';
import CenterLoader from '~/components/atoms/CenterLoader';

import { getAllUsersRequest } from '~/redux/actions/users';

import SPACING from '~/utils/spacing';

import { RootState } from '~/redux/reducers';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const NewMessage: React.FC = () => {
  const [name, setName] = useState('');

  const {
    users: { getAllUsers }
  } = useSelector((state: RootState) => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getAllUsersRequest());
  }, []);

  const handleBack = () => {
    navigation.goBack();
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
          Nova Mensagem
        </Text>

        <Input
          defaultValue={name}
          onChange={newName => setName(newName)}
          placeholder='Busque pelo nome...'
          style={{ marginBottom: SPACING.default, marginTop: SPACING.small }}
        />

        <FlatList
          data={getAllUsers.success}
          renderItem={({ item }) => (
            <ProfileItem name={item.username} uid={item.id} />
          )}
        />
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default NewMessage;
