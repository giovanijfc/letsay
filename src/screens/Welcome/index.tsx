import React, { useLayoutEffect } from 'react';
import Text from '~/components/atoms/Text';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import logoIc from '~/assets/img/logo.png';

const Welcome: React.FC = () => {
  useLayoutEffect(() => {
    setStatusBar(COLORS.secondary, true);
  }, []);

  return (
    <Styled.Container>
      <Styled.ImageLogo source={logoIc} />
      <Styled.AreaBottom>
        <Styled.AreaText>
          <Text semiBold color='white'>
            Diga sim, para novas aventuras
          </Text>
        </Styled.AreaText>
      </Styled.AreaBottom>
    </Styled.Container>
  );
};

export default Welcome;
