import React, { memo } from 'react';
import { View } from 'react-native';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

interface Props {
  name: string | '';
  uid: string | '';
}

const ProfileItem: React.FC<Props> = ({ name, uid }) => {
  return (
    <Styled.Container>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 100,
          backgroundColor: 'gray'
        }}
      />

      <Text
        style={{ marginLeft: SPACING.high }}
        small
        semiBold
        color={COLORS.gray600}
      >
        {name}
      </Text>
    </Styled.Container>
  );
};

export default memo(ProfileItem);
