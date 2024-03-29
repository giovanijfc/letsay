/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import PushNotification from 'react-native-push-notification';

import Chats from '~/screens/Chats';

import { updateUserToken, getById } from '~/services/firebase/database/user';

import { showNotification } from '~/utils/notification';

import { authUserSuccess } from '~/redux/actions/user';

import { Notification } from '~/models/notification';
import { User } from '~/models/user';
import { RootState } from '~/redux/reducers';

import * as Styled from './styles';

let listenerOnMessage = () => {
  return;
};

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const {
    chats: { activeChatId }
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    void checkPermission();
    void PushNotification.cancelAllLocalNotifications();

    listenerOnMessage = onMessage();

    void (async () => {
      const userLoggedId = auth().currentUser?.uid || '';

      if (userLoggedId) {
        const user: User = await getById(userLoggedId);

        if (user) {
          dispatch(authUserSuccess(user));
        }
      }
    })();

    return listenerOnMessage;
  }, []);

  useEffect(() => {
    if (listenerOnMessage) {
      listenerOnMessage();
    }

    listenerOnMessage = onMessage();
  }, [activeChatId]);

  const onMessage = () =>
    messaging().onMessage((remoteMessage: Notification) => {
      if (remoteMessage.data.chatId === activeChatId) {
        return;
      }

      return showNotification(remoteMessage);
    });

  const checkEmailVerifiedCallback = () => {
    if (!auth().currentUser?.emailVerified) {
      void auth().currentUser?.sendEmailVerification();
      const email = auth().currentUser?.email || '';
      return Alert.alert(
        'Verifique seu email',
        `Enviamos um email para ${email}, verifique-o para continuar.`,
        [
          {
            text: 'ENTENDI',
            onPress: async () => {
              await auth().signOut();
            },
            style: 'cancel'
          }
        ]
      );
    }
  };

  useEffect(checkEmailVerifiedCallback, []);

  const checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      void getToken();
    }
  };

  const getToken = (): void => {
    const userLoggedId = auth().currentUser?.uid || '';

    void messaging()
      .getToken()
      .then(token => {
        void updateUserToken(userLoggedId, token);
      });

    messaging().onTokenRefresh(token => {
      void updateUserToken(userLoggedId, token);
    });
  };

  return (
    <Styled.SafeAreaView>
      <Chats />
    </Styled.SafeAreaView>
  );
};

export default Home;
