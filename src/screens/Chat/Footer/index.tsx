import React, { memo, useState, useLayoutEffect } from 'react';
import { SafeAreaView, Keyboard } from 'react-native';

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
  const [marginBottomSafeAreaView, setMarginBottomSafeAreaView] = useState(0);

  useLayoutEffect(() => {
    const listenerKeyboardShow = Keyboard.addListener('keyboardDidShow', () =>
      setMarginBottomSafeAreaView(10)
    );
    const listenerKeyboardHide = Keyboard.addListener('keyboardDidHide', () =>
      setMarginBottomSafeAreaView(0)
    );

    return () => {
      listenerKeyboardShow.remove();
      listenerKeyboardHide.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ marginBottom: marginBottomSafeAreaView }}>
      <Styled.Container>
        <Input
          placeholder='Digite algo...'
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
