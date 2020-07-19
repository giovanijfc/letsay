/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

import Text from '~/components/atoms/Text';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

interface Props {
  text: string;
  value: string;
  style?: StyleProp<TextStyle> | null;
}

const defaultStyleMenuItem = {
  paddingBottom: SPACING.high,
  paddingTop: SPACING.high,
  paddingRight: SPACING.high,
  paddingLeft: SPACING.high,
  borderBottomColor: COLORS.secondary,
  borderBottomWidth: 2
};

const DropdownItem: React.FC<Props> = ({ text, value, style }) => (
  <MenuOption style={defaultStyleMenuItem} value={value}>
    <Text style={style} color='white' regular semiBold>
      {text}
    </Text>
  </MenuOption>
);

export default memo(DropdownItem);
