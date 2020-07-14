/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import Chats from '~/screens/Chats';

import { updateUserToken } from '~/services/firebase/database/user';

import { Notification } from '~/models/notification';

import * as Styled from './styles';
import { showNotification } from '~/utils/notification';

const Home: React.FC = () => {
  useEffect(() => {
    void checkPermission();

    const listenerOnMessage = messaging().onMessage(
      (remoteMessage: Notification) => {
        showNotification(remoteMessage);
      }
    );

    return listenerOnMessage;
  }, []);

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
