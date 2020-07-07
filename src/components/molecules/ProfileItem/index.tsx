import React, { memo, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

interface Props {
  name: string | '';
  uid: string | '';
  onPress?(uid: string): boolean | false;
}

const ProfileItem: React.FC<Props> = ({ name, uid, onPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Styled.Container
      onPress={async () => {
        setIsLoading(true);
        await Promise.resolve(onPress?.(uid));
        setIsLoading(false);
      }}
    >
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

      {isLoading && (
        <Styled.WrapperEnd>
          <ActivityIndicator size='small' color='white' />
        </Styled.WrapperEnd>
      )}
    </Styled.Container>
  );
};

export default memo(ProfileItem);
