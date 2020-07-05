/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

interface Props {
  from: string | '';
}

const Message: React.FC<Props> = ({ from }) => {
  return (
    <Styled.Container from={from}>
      <Styled.TagMessage from={from}>
        <Text regular semiBold color={COLORS.textMessage}>
          Amanhã tenho serviço cedo
        </Text>
      </Styled.TagMessage>
    </Styled.Container>
  );
};

export default memo(Message);
