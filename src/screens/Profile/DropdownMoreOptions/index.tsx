/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import auth from '@react-native-firebase/auth';

import DropdownItem from '~/components/atoms/DropdownItem';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
void Feather.loadFont();

const DropdownMoreOptions: React.FC = () => {
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
      <Menu renderer={renderers.SlideInMenu} onSelect={selectOptionsHandler}>
        <MenuTrigger
          customStyles={{
            triggerTouchable: {
              activeOpacity: 1,
              underlayColor: 'transparent'
            }
          }}
        >
          <Styled.Header>
            <Feather size={30} color='white' name='more-vertical' />
          </Styled.Header>
        </MenuTrigger>

        <MenuOptions
          style={{
            backgroundColor: COLORS.separator,
            paddingBottom: 50
          }}
        >
          <DropdownItem
            text='Trocar foto de capa'
            value='ChangeBackgroundImage'
          />
          <DropdownItem text='Sair da conta' value='Logout' />
        </MenuOptions>
      </Menu>
    </Styled.Container>
  );
};

export default DropdownMoreOptions;
