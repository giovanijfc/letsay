import React, { memo, useState } from 'react';
import { SafeAreaView } from 'react-native';

import Input from '~/components/atoms/Input';
import Button from '~/components/atoms/Button';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

interface Props {
  onPressSendMessage(message: string, callbackFinish: unknown): void;
}

const Footer: React.FC<Props> = ({ onPressSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView>
      <Styled.Container>
        <Input
          placeholder='Escreva uma mensagem...'
          style={{ width: '80%' }}
          defaultValue={newMessage}
          onChange={message => !isLoading && setNewMessage(message)}
        />

        <Button
          isLoading={isLoading}
          style={{ borderRadius: 100, width: 50, height: 50 }}
          onPress={() => {
            if (newMessage.length === 0) {
              return;
            }

            setIsLoading(true);
            onPressSendMessage(newMessage, () => {
              setIsLoading(false);
              setNewMessage('');
            });
          }}
        >
          <IconAntDesign name='arrowright' color={COLORS.secondary} size={24} />
        </Button>
      </Styled.Container>
    </SafeAreaView>
  );
};

export default memo(Footer);
