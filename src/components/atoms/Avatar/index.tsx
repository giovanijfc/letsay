/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

import * as Styled from './styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageProfile = require('~/assets/img/perfil.jpg');

interface Props {
  onPress?(): void;
  source?: string | '';
  style?: StyleProp<ViewStyle> | null;
}

const Avatar: React.FC<Props> = ({ source, onPress, style }) => {
  return (
    <Styled.Container onPress={onPress} style={style}>
      <Styled.ImageAvatar
        borderRadius={100}
        loadingIndicatorSource={imageProfile}
        source={source || imageProfile}
      />
    </Styled.Container>
  );
};

export default memo(Avatar);
