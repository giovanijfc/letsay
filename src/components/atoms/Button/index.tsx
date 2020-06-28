/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { StyleProp, ViewStyle, ActivityIndicator } from 'react-native';

import COLORS from '~/utils/colors/';

import * as Styled from './styles';

import { getBorderRadius } from './helpers';

interface Props {
  children: React.ReactNode;
  rounded?: boolean | false;
  extraRounded?: boolean | false;
  backgroundColor?: string | '';
  onPress(): void;
  style?: StyleProp<ViewStyle> | null;
  isLoading?: boolean | false;
}

const Button: React.FC<Props> = ({
  children,
  rounded,
  extraRounded,
  backgroundColor,
  onPress,
  style,
  isLoading
}) => {
  const borderRadius: number = getBorderRadius(rounded, extraRounded);

  return (
    <Styled.Button
      disabled={isLoading}
      onPress={onPress}
      style={{
        ...style,
        borderRadius,
        backgroundColor: backgroundColor || COLORS.primary
      }}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={COLORS.secondary} />
      ) : (
        children
      )}
    </Styled.Button>
  );
};

export default memo(Button);
