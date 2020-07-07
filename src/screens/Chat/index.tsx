import React, { useLayoutEffect, useState } from 'react';

import Message from '~/components/atoms/Message';

import Header from './Header';
import Footer from './Footer';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { User } from '~/models/user';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

interface Props {
  route: Route;
}

interface Route {
  params: Params;
}

interface Params {
  otherUser: User;
}

const Chat: React.FC<Props> = ({ route }) => {
  const [otherUser] = useState(route.params.otherUser);

  useLayoutEffect(() => {
    setStatusBar(COLORS.separator, true);
  }, []);

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Header name={otherUser.username} />

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
