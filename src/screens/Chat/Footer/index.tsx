import React, { memo, useState } from 'react';
import { SafeAreaView } from 'react-native';

import Input from '~/components/atoms/Input';
import Button from '~/components/atoms/Button';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Footer: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <SafeAreaView>
      <Styled.Container>
        <Input
          placeholder='Escreva uma mensagem...'
          style={{ width: '80%' }}
          defaultValue={newMessage}
          onChange={message => setNewMessage(message)}
        />

        <Button
          style={{ borderRadius: 100, width: 50, height: 50 }}
          onPress={() => console.log('send message!')}
        >
          <IconAntDesign name='arrowright' color={COLORS.secondary} size={24} />
        </Button>
      </Styled.Container>
    </SafeAreaView>
  );
};

export default memo(Footer);
