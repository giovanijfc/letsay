/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input/';
import Button from '~/components/atoms/Button';

import { registerUserRequest, resetState } from '~/redux/actions/user';

import { User } from '~/models/user';

import SPACING from '~/utils/spacing';
import { validateEmail, validatePhoneBR } from '~/utils/validate';
import COLORS from '~/utils/colors';

import { RootState } from '~/redux/reducers';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Register: React.FC = () => {
  const {
    user: { registerUser }
  } = useSelector((state: RootState) => state);

  const { register, setValue, handleSubmit, errors } = useForm<User>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    register(
      { name: 'email' },
      {
        required: true,
        validate: {
          notIsEmail: email => validateEmail(email)
        }
      }
    );
    register({ name: 'password' }, { required: true, minLength: 6 });
    register({ name: 'username' }, { required: true, minLength: 5 });
    register(
      { name: 'phone' },
      {
        validate: {
          notIsPhone: phoneNumber => {
            if (!phoneNumber || phoneNumber === '') return true;

            return validatePhoneBR(phoneNumber);
          }
        }
      }
    );
  }, [register]);

  const userRegisterCallback = () => {
    if (registerUser.success) {
      dispatch(resetState());
    }

    if (registerUser.fail) {
      return Alert.alert('Aconteceu um problema', registerUser.fail, [
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

  useLayoutEffect(userRegisterCallback, [
    registerUser.success,
    registerUser.fail
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (user: User) => {
    dispatch(registerUserRequest(user));
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={-10}>
        <TouchableOpacity
          disabled={registerUser.isLoading}
          onPress={handleBack}
        >
          <IconAntDesign
            size={32}
            color={registerUser.isLoading ? COLORS.gray500 : 'white'}
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
            Criar sua conta
          </Text>

          {errors.username && errors.username.type === 'required' && (
            <Text
              color={COLORS.error}
              small
              style={{
                marginLeft: SPACING.default,
                marginBottom: SPACING.nano
              }}
            >
              Nome é obrigatorio!*
            </Text>
          )}

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Nome de usuário'
            defaultValue=''
            onChange={(text: string) => setValue('username', text)}
          />

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
            style={{ marginBottom: SPACING.default }}
            onSubmitEditing={handleSubmit(onSubmit)}
            placeholder='Email'
            keyboardType='email-address'
            defaultValue=''
            onChange={(text: string) => setValue('email', text)}
          />

          {errors.phone && errors.phone.type === 'notIsPhone' && (
            <Text
              color={COLORS.error}
              small
              style={{
                marginLeft: SPACING.default,
                marginBottom: SPACING.nano
              }}
            >
              Numero digitado incorreto!
            </Text>
          )}

          <Input
            style={{ marginBottom: SPACING.default }}
            onSubmitEditing={handleSubmit(onSubmit)}
            placeholder='Telefone'
            keyboardType='phone-pad'
            mask={{
              type: 'cel-phone',
              options: {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }
            }}
            defaultValue=''
            onChange={(text: string) => setValue('phone', text)}
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
                : 'A senha não pode ser menor que 6 dígitos!*'}
            </Text>
          )}

          <Input
            placeholder='Senha'
            onSubmitEditing={handleSubmit(onSubmit)}
            defaultValue=''
            type='restrict'
            onChange={(text: string) => setValue('password', text)}
          />

          <Button
            isLoading={registerUser.isLoading}
            style={{ marginTop: 48 }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text semiBold regular>
              Registrar
            </Text>
          </Button>
        </Styled.AreaForm>

        <Text
          style={{
            marginTop: 40,
            textAlign: 'center',
            marginLeft: SPACING.large,
            marginRight: SPACING.large,
            lineHeight: 15
          }}
          color={COLORS.gray500}
          small
        >
          Ao tocar em registrar você está aceitando todos os termos e condições
          desse estabelecimento.
        </Text>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Register;
