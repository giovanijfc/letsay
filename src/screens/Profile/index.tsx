/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Avatar from '~/components/atoms/Avatar';
import Text from '~/components/atoms/Text';

import DropdownMoreOptions from './DropdownMoreOptions';

import { getById } from '~/services/firebase/database/user';

import { authUserSuccess } from '~/redux/actions/user';

import SPACING from '~/utils/spacing';

import * as Styled from './styles';

import { RootState } from '~/redux/reducers';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
import CenterLoader from '~/components/atoms/CenterLoader';
import { User } from '~/models/user';
void Feather.loadFont();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const walpapper = require('~/assets/img/walpapper.jpg');

const Profile: React.FC = () => {
  const {
    user: { authUser }
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!authUser.success) {
      void (async () => {
        const userLoggedId = auth().currentUser?.uid || '';

        if (userLoggedId) {
          const user: User = await getById(userLoggedId);

          if (user) {
            dispatch(authUserSuccess(user));
          }
        }
      })();
    }
  }, [authUser]);

  return (
    <Styled.SafeAreaView>
      {authUser.isLoading || !authUser.success ? (
        <CenterLoader />
      ) : (
        <Styled.Container>
          <Styled.Background source={walpapper}>
            <DropdownMoreOptions />

            <Styled.AreaRow>
              <Avatar source={''} style={{ width: 100, height: 100 }} />

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: SPACING.high
                  }}
                  semiBold
                  big
                  color='white'
                >
                  {authUser.success?.username}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: SPACING.high,
                    marginTop: SPACING.small
                  }}
                  regular
                  semiBold
                  color='white'
                >
                  {authUser.success?.nickname}
                </Text>
              </View>
            </Styled.AreaRow>

            <Styled.WrapperDetails>
              <Text color='white' semiBold>
                ...
              </Text>
              <Text semiBold small color='white'>
                Amigos
              </Text>
            </Styled.WrapperDetails>
          </Styled.Background>

          <Styled.AreaSolicitations>
            <Text extraBig semiBold color='white'>
              Solicitações
            </Text>
          </Styled.AreaSolicitations>
        </Styled.Container>
      )}
    </Styled.SafeAreaView>
  );
};

export default Profile;
