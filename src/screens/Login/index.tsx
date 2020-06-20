/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input/';
import Button from '~/components/atoms/Button';

import SPACING from '~/utils/spacing';
import { validateEmail } from '~/utils/validate';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

const Login: React.FC = () => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const navigation = useNavigation();

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

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (values: unknown) => {
    Alert.alert('submit', JSON.stringify(values));
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={40}>
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

          <Button style={{ marginTop: 48 }} onPress={handleSubmit(onSubmit)}>
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
          color='white'
          semiBold
          regular
          onPress={() => Alert.alert('Esqueceu')}
        >
          Esqueceu sua senha?
        </Text>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default Login;
