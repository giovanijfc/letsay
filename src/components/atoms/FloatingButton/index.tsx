/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { StyleProp, ViewStyle, ActivityIndicator } from 'react-native';

import COLORS from '~/utils/colors/';

import * as Styled from './styles';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string | '';
  onPress(): void;
  style?: StyleProp<ViewStyle> | null;
  isLoading?: boolean | false;
  top?: number | 0;
  bottom?: number | 0;
  left?: number | 0;
  right?: number | 0;
}

const FloatingButton: React.FC<Props> = ({
  children,
  backgroundColor,
  onPress,
  style,
  isLoading,
  top,
  bottom,
  left,
  right
}) => (
  <Styled.Button
    disabled={isLoading}
    onPress={onPress}
    style={{
      ...style,
      backgroundColor: backgroundColor || COLORS.primary,
      top,
      bottom,
      left,
      right
    }}
  >
    {isLoading ? (
      <ActivityIndicator size='small' color={COLORS.secondary} />
    ) : (
      children
    )}
  </Styled.Button>
);

export default memo(FloatingButton);
