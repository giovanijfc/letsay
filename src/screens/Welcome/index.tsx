/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Text from '~/components/atoms/Text';
import Button from '~/components/atoms/Button';

import * as Styled from './styles';

import logoIc from '~/assets/img/logo.png';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const handleButtonGo = () => {
    navigation.navigate('Register');
  };

  return (
    <Styled.Container>
      <Styled.ImageLogo source={logoIc} />
      <Styled.AreaBottom>
        <Styled.AreaText>
          <Text semiBold color='white'>
            Diga sim, para novas aventuras
          </Text>
        </Styled.AreaText>

        <Button backgroundColor='white' onPress={handleButtonGo}>
          <Text semiBold regular>
            Registrar
          </Text>
        </Button>

        <Styled.SpaceTop />

        <Button onPress={handleButtonGo}>
          <Text semiBold regular>
            Login
          </Text>
        </Button>
      </Styled.AreaBottom>
    </Styled.Container>
  );
};

export default Welcome;
