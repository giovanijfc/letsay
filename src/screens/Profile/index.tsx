/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Avatar from '~/components/atoms/Avatar';
import Text from '~/components/atoms/Text';
import Button from '~/components/atoms/Button';

import Dropdown from './Dropdown';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
void Feather.loadFont();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const walpapper = require('~/assets/img/walpapper.jpg');

const Profile: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Styled.Background source={walpapper}>
          <Dropdown />

          <View>
            <Styled.AreaRow>
              <Avatar source={''} style={{ width: 100, height: 100 }} />

              <Text
                numberOfLines={1}
                style={{
                  marginLeft: SPACING.default,
                  width: '70%'
                }}
                extraBig
                semiBold
                color='white'
              >
                Giovani Jose Fonseca Chiodi
              </Text>
            </Styled.AreaRow>
            <Styled.AreaRow>
              <Button
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  paddingLeft: SPACING.high,
                  paddingRight: SPACING.high
                }}
              >
                <Text regular bold color={COLORS.secondary}>
                  Editar Dados
                </Text>
              </Button>

              <Styled.WrapperDetails>
                <Text color='white'>10</Text>
                <Text small color='white'>
                  Amigos
                </Text>
              </Styled.WrapperDetails>
            </Styled.AreaRow>
          </View>
        </Styled.Background>

        <Styled.AreaSolicitations>
          <Text extraBig semiBold color='white'>
            Solicitações
          </Text>
        </Styled.AreaSolicitations>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Profile;
