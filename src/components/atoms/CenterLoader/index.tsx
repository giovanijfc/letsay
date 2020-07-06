/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import * as Styled from './styles';

const CenterLoader: React.FC = () => (
  <Styled.Container>
    <ActivityIndicator size='large' color='white' />
  </Styled.Container>
);

export default memo(CenterLoader);
