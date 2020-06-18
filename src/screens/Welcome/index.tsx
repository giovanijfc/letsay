import React from 'react';

import Text from '~/components/atoms/Text';

import * as Styled from './styles';

const Welcome: React.FC = () => {
  return (
    <Styled.Container>
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
