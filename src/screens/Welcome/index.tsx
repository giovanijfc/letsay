/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Text from '~/components/atoms/Text';
import Button from '~/components/atoms/Button';

import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import logoIc from '~/assets/img/logo.png';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const handlePressGoLogin = () => {
    navigation.navigate('Login');
  };

  const handlePressGoRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Styled.Container>
      <Styled.ImageLogo source={logoIc} />
      <Styled.AreaBottom>
        <Text semiBold color='white'>
          Seu app de mensagem!
        </Text>

        <Button
          style={{ marginTop: SPACING.huge }}
          backgroundColor='white'
          onPress={handlePressGoRegister}
        >
          <Text semiBold regular>
            Registrar
          </Text>
        </Button>

        <Styled.SpaceTop />

        <Button onPress={handlePressGoLogin}>
          <Text semiBold regular>
            Login
          </Text>
        </Button>
      </Styled.AreaBottom>
    </Styled.Container>
  );
};

export default Welcome;
