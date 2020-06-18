import React, { memo } from 'react';

import * as Styled from './styles';

import { getFontSize, getFontWeight, getFontFamily } from './helpers';

interface Props {
  children: string;
  small?: boolean | false;
  ultraSmall?: boolean | false;
  regular?: boolean | false;
  extraRegular?: boolean | false;
  big?: boolean | false;
  extraBig?: boolean | false;
  semiBold?: boolean | false;
  bold?: boolean | false;
  color?: string | 'white';
}

const Text: React.FC<Props> = ({
  children,
  small,
  ultraSmall,
  regular,
  extraRegular,
  big,
  extraBig,
  semiBold,
  bold,
  color
}) => {
  const fontSize: number = getFontSize(
    small,
    ultraSmall,
    regular,
    extraRegular,
    big,
    extraBig
  );

  const fontWeight: string = getFontWeight(semiBold, bold);

  const fontFamily: string = getFontFamily(bold, semiBold);

  return (
    <Styled.Text
      style={{
        fontSize,
        color,
        fontWeight,
        fontFamily
      }}
    >
      {children}
    </Styled.Text>
  );
};

export default memo(Text);
