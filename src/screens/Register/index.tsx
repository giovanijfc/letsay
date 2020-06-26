/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input/';
import Button from '~/components/atoms/Button';

import realtime from '~/services/firebase/realtime';

import SPACING from '~/utils/spacing';
import { validateEmail, validatePhoneBR } from '~/utils/validate';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Register: React.FC = () => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const navigation = useNavigation();

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
    register({ name: 'password' }, { required: true, minLength: 5 });
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

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = async ({
    email,
    password,
    username,
    phone
  }: {
    email: string;
    password: string;
    username: string;
    phone: string;
  }) => {
    const user = {
      email,
      password,
      username,
      phone
    };

    await realtime.User.createUser(user);
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={-10}>
        <TouchableOpacity onPress={handleBack}>
          <IconAntDesign size={32} color='white' name='left' />
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
                : 'A senha não é menor que 6 dígitos!*'}
            </Text>
          )}

          <Input
            placeholder='Senha'
            onSubmitEditing={handleSubmit(onSubmit)}
            defaultValue=''
            type='restrict'
            onChange={(text: string) => setValue('password', text)}
          />

          <Button style={{ marginTop: 48 }} onPress={handleSubmit(onSubmit)}>
            <Text semiBold regular>
              Entrar
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
          color={COLORS.grey500}
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
