import React, { memo } from 'react';
import { View } from 'react-native';

import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

import * as Styled from './styles';
import { UserPreviewChat } from '~/models/user';
import { LastMessagePreview } from '~/models/message';

interface Props {
  otherUser: UserPreviewChat;
  onPress(otherUser: UserPreviewChat): void;
  lastMessage: LastMessagePreview;
}

const ChatItem: React.FC<Props> = ({ otherUser, onPress, lastMessage }) => {
  return (
    <Styled.Container onPress={() => onPress(otherUser)}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          backgroundColor: 'gray'
        }}
      />
      <Styled.AreaInfo>
        <Styled.WrapperHeaderInfo>
          <Text small semiBold color={COLORS.gray600}>
            {otherUser.username}
          </Text>
          <Text small color={COLORS.gray600}>
            {lastMessage.message === 'Inicie a conversa...'
              ? 'Agora'
              : lastMessage?.date &&
                new Date(lastMessage.date).getDate().toString()}
          </Text>
        </Styled.WrapperHeaderInfo>

        <Text style={{ marginTop: SPACING.default }} regular color='white'>
          {lastMessage.message}
        </Text>
      </Styled.AreaInfo>
    </Styled.Container>
  );
};

export default memo(ChatItem);
