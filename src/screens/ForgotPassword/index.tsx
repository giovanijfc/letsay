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

const ForgotPassword: React.FC = () => {
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
            style={{ marginBottom: SPACING.large }}
            semiBold
            color='white'
            extraBig
          >
            Esqueci a senha
          </Text>

          <Text
            style={{ marginBottom: SPACING.huge }}
            color={COLORS.grey500}
            regular
          >
            Por favor insira seu email para receber o link de criação da nova
            senha.
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

          <Button style={{ marginTop: 48 }} onPress={handleSubmit(onSubmit)}>
            <Text semiBold regular>
              Enviar
            </Text>
          </Button>
        </Styled.AreaForm>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default ForgotPassword;
