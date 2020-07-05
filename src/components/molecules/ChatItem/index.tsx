import React, { memo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

const ChatItem: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Styled.Container onPress={() => navigation.navigate('Chat')}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          backgroundColor: 'gray'
        }}
      />
      <Styled.AreaInfo>
        <Styled.WrapperHeaderInfo>
          <Text small semiBold color={COLORS.gray600}>
            GeoGeo
          </Text>
          <Text small color={COLORS.gray600}>
            10:24PM
          </Text>
        </Styled.WrapperHeaderInfo>

        <Text style={{ marginTop: SPACING.default }} regular color='white'>
          Está é a mensagem!
        </Text>
      </Styled.AreaInfo>
    </Styled.Container>
  );
};

export default memo(ChatItem);
