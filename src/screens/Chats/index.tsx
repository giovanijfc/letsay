import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import ChatItem from '~/components/molecules/ChatItem';

import FloatingButton from '~/components/atoms/FloatingButton';
import Text from '~/components/atoms/Text';

import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
void MaterialCommunityIcons.loadFont();

const Chats: React.FC = () => {
  const navigation = useNavigation();

  const onClickNewMessageHandler = () => {
    navigation.navigate('NewChat');
  };

  const onClickSignoutHandler = async () => {
    await auth().signOut();
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <Styled.AreaHeader>
          <Text color='white' semiBold>
            Mensagens
          </Text>

          <MaterialCommunityIcons
            name='logout'
            color={COLORS.primary}
            size={34}
            onPress={onClickSignoutHandler}
          />
        </Styled.AreaHeader>

        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />

        <FloatingButton
          style={{
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          bottom={20}
          right={15}
          onPress={onClickNewMessageHandler}
        >
          <IconAntDesign name='plus' color={COLORS.secondary} size={34} />
        </FloatingButton>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Chats;
