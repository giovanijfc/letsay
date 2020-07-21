import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '~/components/atoms/Text/';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import SPACING from '~/utils/spacing';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

interface Props {
  name: string;
  nickname?: string | '';
}

const Header: React.FC<Props> = ({ name, nickname }) => {
  const navigation = useNavigation();

  const handleClickBack = () => {
    navigation.goBack();
  };

  return (
    <Styled.Container>
      <TouchableOpacity onPress={handleClickBack}>
        <IconAntDesign size={32} color='white' name='left' />
      </TouchableOpacity>

      <Styled.WrapperNames>
        <Text semiBold extraRegular color='white'>
          {name}
        </Text>

        {nickname && (
          <Text
            style={{ marginTop: SPACING.nano }}
            semiBold
            small
            color='white'
          >
            {nickname}
          </Text>
        )}
      </Styled.WrapperNames>

      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
          backgroundColor: 'gray'
        }}
      />
    </Styled.Container>
  );
};

export default memo(Header);
