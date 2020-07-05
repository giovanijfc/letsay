import React, { useLayoutEffect } from 'react';

import Message from '~/components/atoms/Message';

import Header from './Header';
import Footer from './Footer';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Chat: React.FC = () => {
  useLayoutEffect(() => {
    setStatusBar(COLORS.separator, true);
  }, []);

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Header />

        <Message from={'userLogged'} />
        <Message from={'useraLogged'} />
        <Message from={'userLogged'} />
        <Message from={'useraLogged'} />
        <Message from={'userLogged'} />
        <Message from={'userLogged'} />
        <Message from={'useraLogged'} />
      </Styled.Container>

      <Footer />
    </Styled.SafeAreaView>
  );
};

export default Chat;
