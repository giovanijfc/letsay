import React, { useLayoutEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

import Message from '~/components/atoms/Message';

import Header from './Header';
import Footer from './Footer';

import database from '~/services/firebase/database';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import { User } from '~/models/user';
import { Chat as ChatModel } from '~/models/chat';
import { Message as MessageModel } from '~/models/message';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

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
  chat: ChatModel;
}

const Chat: React.FC<Props> = ({ route }) => {
  const [otherUser] = useState(route?.params?.otherUser);
  const [chat] = useState(route?.params?.chat);

  useLayoutEffect(() => {
    setStatusBar(COLORS.separator, true);
  }, []);

  const onPressSendMessageHandler = async (
    textMessage: string,
    callbackFinish: unknown
  ) => {
    const userLoggedId = auth().currentUser?.uid;

    const message: MessageModel = {
      chatId: chat.id,
      message: textMessage,
      userId: userLoggedId || '',
      date: String(Date.now())
    };

    await database.message.createMessage(message);

    if (callbackFinish && typeof callbackFinish === 'function') {
      callbackFinish();
    }
  };

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

      <Footer onPressSendMessage={onPressSendMessageHandler} />
    </Styled.SafeAreaView>
  );
};

export default Chat;
