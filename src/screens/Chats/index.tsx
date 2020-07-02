import COLORS from '~/utils/colors';
import React from 'react';
import { Alert } from 'react-native';

import ChatItem from '~/components/molecules/ChatItem';

import FloatingButton from '~/components/atoms/FloatingButton';
import Text from '~/components/atoms/Text';

import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Chats: React.FC = () => {
  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Text
          style={{
            marginBottom: SPACING.large
          }}
          color='white'
          semiBold
        >
          Mensagens
        </Text>

        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />

        <FloatingButton
          style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          bottom={20}
          right={15}
          onPress={() => {
            Alert.alert('teste');
          }}
        >
          <IconAntDesign name='plus' color={COLORS.secondary} size={34} />
        </FloatingButton>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Chats;
