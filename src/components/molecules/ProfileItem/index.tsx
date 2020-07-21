import React, { memo, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';

interface Props {
  name: string | '';
  uid: string | '';
  nickname?: string | '';
  onPress?(uid: string): boolean | false;
}

const ProfileItem: React.FC<Props> = ({ nickname, name, uid, onPress }) => {
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

      <Styled.WrapperNames>
        <Text small semiBold color={COLORS.gray600}>
          {name}
        </Text>

        {nickname && (
          <Text
            style={{ marginTop: SPACING.small }}
            ultraSmall
            semiBold
            color={COLORS.gray600}
          >
            {nickname}
          </Text>
        )}
      </Styled.WrapperNames>

      {isLoading && (
        <Styled.WrapperEnd>
          <ActivityIndicator size='small' color='white' />
        </Styled.WrapperEnd>
      )}
    </Styled.Container>
  );
};

export default memo(ProfileItem);
