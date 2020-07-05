/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileItem from '~/components/molecules/ProfileItem';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input';

import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const NewMessage: React.FC = () => {
  const [name, setName] = useState('');

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

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

        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default NewMessage;
