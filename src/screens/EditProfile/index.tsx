/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

import Input from '~/components/atoms/Input/';
import Text from '~/components/atoms/Text/';
import Button from '~/components/atoms/Button/';
import DropdownItem from '~/components/atoms/DropdownItem';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';
import { validatePhoneBR } from '~/utils/validate';

import { User } from '~/models/user';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
void Feather.loadFont();

const EditProfile: React.FC = () => {
  const [isOpenDropdownSex, setIsOpenDropdownSex] = useState(false);

  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, setValue, handleSubmit, errors } = useForm<User>();

  useLayoutEffect(() => {
    register({ name: 'username' }, { minLength: 5 });
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
    register({ name: 'nickname' });
    register({ name: 'birthday' });
    register({ name: 'sex' });
  }, []);

  const selectOptionsHandler = (optionValue: string) => {
    setIsOpenDropdownSex(false);

    switch (optionValue) {
      case 'Woman':
        return;
      case 'Man':
        return;
      case 'Other':
        return;
      default:
        return;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = data => {
    Alert.alert(JSON.stringify(data));
  };

  console.log(errors);

  return (
    <Styled.SafeAreaView>
      <Styled.Container>
        <TouchableOpacity onPress={handleBack}>
          <IconAntDesign size={32} color='white' name='left' />
        </TouchableOpacity>

        <Styled.AreaForm behavior='position'>
          <Text
            style={{ marginBottom: SPACING.huge }}
            semiBold
            color='white'
            extraBig
          >
            Editar conta
          </Text>

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Nome de usuário'
            defaultValue=''
            onChange={(text: string) => setValue('username', text)}
          />

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Apelido'
            defaultValue=''
            onChange={(text: string) => setValue('nickname', `@${text}`)}
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

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Data de aniversário'
            defaultValue=''
            onChange={(text: string) => setValue('birthday', `@${text}`)}
          />

          <Menu
            opened={isOpenDropdownSex}
            renderer={renderers.SlideInMenu}
            onSelect={selectOptionsHandler}
            onBackdropPress={() => setIsOpenDropdownSex(false)}
          >
            <MenuTrigger
              customStyles={{
                triggerTouchable: {
                  activeOpacity: 1,
                  underlayColor: 'transparent'
                }
              }}
              onPress={() => setIsOpenDropdownSex(prevState => !prevState)}
            >
              <Styled.WrapperTrigger>
                <Text style={{ fontSize: 18 }} color='white' semiBold>
                  Sexo
                </Text>
                <IconAntDesign
                  color='white'
                  size={20}
                  name={isOpenDropdownSex ? 'caretup' : 'caretdown'}
                />
              </Styled.WrapperTrigger>
            </MenuTrigger>

            <MenuOptions
              style={{
                backgroundColor: COLORS.separator,
                paddingBottom: 50
              }}
            >
              <DropdownItem value='Woman' text='Feminino' />
              <DropdownItem value='Man' text='Masculino' />
              <DropdownItem value='Other' text='Outro' />
            </MenuOptions>
          </Menu>

          <Button style={{ marginTop: 60 }} onPress={handleSubmit(onSubmit)}>
            <Text semiBold regular>
              Salvar
            </Text>
          </Button>
        </Styled.AreaForm>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

export default EditProfile;
