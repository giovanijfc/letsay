/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import Button from '~/components/atoms/Button';
import Text from '~/components/atoms/Text';

import * as Styled from './styles';

const Home: React.FC = () => {
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

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={40}>
        <Button
          onPress={async () => {
            await auth().signOut();
          }}
        >
          <Text>Deslogar</Text>
        </Button>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Home;
