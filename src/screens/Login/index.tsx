/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input/';
import Button from '~/components/atoms/Button';

import { authUserRequest, resetState } from '~/redux/actions/user';

import SPACING from '~/utils/spacing';
import { validateEmail } from '~/utils/validate';
import COLORS from '~/utils/colors';

import { Credentials } from '~/models/credentials';
import { RootState } from '~/redux/reducers';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Login: React.FC = () => {
  const {
    user: { authUser }
  } = useSelector((state: RootState) => state);

  const { register, setValue, handleSubmit, errors } = useForm<Credentials>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    register(
      { name: 'email' },
      {
        required: true,
        validate: {
          notIsEmail: text => validateEmail(text)
        }
      }
    );
    register({ name: 'password' }, { required: true, minLength: 6 });
  }, [register]);

  const userAuthCallback = () => {
    if (authUser.fail) {
      return Alert.alert('Aconteceu um problema', authUser.fail, [
        {
          text: 'ENTENDI',
          onPress: () => {
            dispatch(resetState());
          },
          style: 'cancel'
        }
      ]);
    }
  };

  useLayoutEffect(userAuthCallback, [authUser.success, authUser.fail]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePressForgotPassword = () => {
    if (authUser.isLoading) return;

    navigation.navigate('ForgotPassword');
  };

  const onSubmit = (credentials: Credentials) => {
    dispatch(authUserRequest(credentials));
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={40}>
        <TouchableOpacity disabled={authUser.isLoading} onPress={handleBack}>
          <IconAntDesign
            size={32}
            color={authUser.isLoading ? COLORS.grey500 : 'white'}
            name='left'
          />
        </TouchableOpacity>

        <Styled.AreaForm>
          <Text
            style={{ marginBottom: SPACING.huge }}
            semiBold
            color='white'
            extraBig
          >
            Bem vindo de volta
          </Text>

          {errors.email && errors.email.type && (
            <Text
              color={COLORS.error}
              small
              style={{
                marginLeft: SPACING.default,
                marginBottom: SPACING.nano
              }}
            >
              {errors.email.type === 'required'
                ? 'Email obrigatorio!*'
                : 'Digite um email correto!*'}
            </Text>
          )}

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Email'
            keyboardType='email-address'
            defaultValue=''
            onChange={(text: string) => setValue('email', text)}
          />

          {errors.password && errors.password.type && (
            <Text
              color={COLORS.error}
              small
              style={{
                marginLeft: SPACING.default,
                marginBottom: SPACING.nano
              }}
            >
              {errors.password.type === 'required'
                ? 'Senha obrigatoria!*'
                : 'A senha não é menor que 6 dígitos!*'}
            </Text>
          )}

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            placeholder='Senha'
            defaultValue=''
            type='restrict'
            onChange={(text: string) => setValue('password', text)}
          />

          <Button
            isLoading={authUser.isLoading}
            style={{ marginTop: 48 }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text semiBold regular>
              Entrar
            </Text>
          </Button>
        </Styled.AreaForm>

        <Text
          style={{
            marginTop: 40,
            textAlign: 'center'
          }}
          color={authUser.isLoading ? COLORS.grey500 : 'white'}
          semiBold
          regular
          onPress={handlePressForgotPassword}
        >
          Esqueceu sua senha?
        </Text>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Login;
