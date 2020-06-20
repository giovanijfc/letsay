/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import * as Styled from './styles';

import { getBorderRadius } from './helpers';
import COLORS from '~/utils/colors/';

interface Props {
  children: React.ReactNode;
  rounded?: boolean | false;
  extraRounded?: boolean | false;
  backgroundColor?: string | '';
  onPress(): void;
  style?: StyleProp<ViewStyle> | null;
}

const Button: React.FC<Props> = ({
  children,
  rounded,
  extraRounded,
  backgroundColor,
  onPress,
  style
}) => {
  const borderRadius: number = getBorderRadius(rounded, extraRounded);

  return (
    <Styled.Button
      onPress={onPress}
      style={{
        ...style,
        borderRadius,
        backgroundColor: backgroundColor || COLORS.primary
      }}
    >
      {children}
    </Styled.Button>
  );
};

export default memo(Button);
