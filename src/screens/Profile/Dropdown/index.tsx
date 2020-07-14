/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import auth from '@react-native-firebase/auth';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
void Feather.loadFont();

const defaultStyleMenuItem = {
  paddingBottom: SPACING.default,
  paddingTop: SPACING.default,
  paddingRight: SPACING.default,
  paddingLeft: SPACING.default,
  borderBottomColor: COLORS.separator,
  borderBottomWidth: 2
};

const Dropdown: React.FC = () => {
  const selectOptionsHandler = (optionValue: string) => {
    switch (optionValue) {
      case 'Logout':
        return onPressSignoutHandler();
      default:
        return;
    }
  };

  const onPressSignoutHandler = async () => {
    await auth().signOut();
  };

  return (
    <Styled.Container>
      <MenuProvider
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        <Menu onSelect={selectOptionsHandler}>
          <MenuTrigger>
            <Styled.Header>
              <Feather size={30} color='white' name='more-vertical' />
            </Styled.Header>
          </MenuTrigger>

          <MenuOptions style={{ backgroundColor: COLORS.secondary }}>
            <MenuOption
              style={defaultStyleMenuItem}
              value={'ChangeBackgroundImage'}
            >
              <Text color='white' regular semiBold>
                Trocar foto de capa
              </Text>
            </MenuOption>
            <MenuOption style={defaultStyleMenuItem} value={'Logout'}>
              <Text color='white' regular semiBold>
                Sair da conta
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </Styled.Container>
  );
};

export default Dropdown;
