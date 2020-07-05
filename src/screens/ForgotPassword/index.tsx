/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';

import Text from '~/components/atoms/Text/';
import Input from '~/components/atoms/Input';
import Button from '~/components/atoms/Button';

import SPACING from '~/utils/spacing';
import { validateEmail } from '~/utils/validate';
import COLORS from '~/utils/colors';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
// eslint-disable-next-line @typescript-eslint/no-floating-promises
IconAntDesign.loadFont();

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, setValue, handleSubmit, errors } = useForm<
    ForgotPasswordForm
  >();
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

  const onSubmit = async (values: ForgotPasswordForm) => {
    setIsLoading(true);
    await auth().sendPasswordResetEmail(values.email);
    setIsLoading(false);

    return Alert.alert(
      'Redefinir senha',
      `Enviamos um email para ${values.email}, verifique-o para redefinir sua senha.`,
      [
        {
          text: 'ENTENDI',
          onPress: () => {
            navigation.goBack();
          },
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <Styled.SafeAreaView>
      <Styled.Container behavior='position' keyboardVerticalOffset={40}>
        <TouchableOpacity disabled={isLoading} onPress={handleBack}>
          <IconAntDesign
            size={32}
            color={isLoading ? COLORS.gray500 : 'white'}
            name='left'
          />
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
            color={COLORS.gray500}
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

          <Button
            isLoading={isLoading}
            style={{ marginTop: 48 }}
            onPress={handleSubmit(onSubmit)}
          >
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
