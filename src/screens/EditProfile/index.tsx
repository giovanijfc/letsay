/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Input from '~/components/atoms/Input/';
import Text from '~/components/atoms/Text/';
import Button from '~/components/atoms/Button/';
import DropdownItem from '~/components/atoms/DropdownItem';

import { updateAuthUserDataRequest } from '~/redux/actions/user';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';
import { validatePhoneBR } from '~/utils/validate';

import { User } from '~/models/user';
import { RootState } from '~/redux/reducers';

import * as Styled from './styles';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

import Feather from 'react-native-vector-icons/Feather';
void Feather.loadFont();

const EditProfile: React.FC = () => {
  const [isOpenDropdownSex, setIsOpenDropdownSex] = useState(false);
  const [isEditData, setIsEditData] = useState(false);

  const {
    user: { authUser }
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, setValue, handleSubmit, errors, getValues } = useForm<
    User
  >();

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

  useLayoutEffect(() => {
    checkIsEdit();
  }, [authUser]);

  const selectOptionsHandler = (optionValue: string) => {
    setIsOpenDropdownSex(false);

    onChangeText('sex', optionValue);
  };

  const onChangeText = (key: string, value: string) => {
    setValue(key, value);

    void checkIsEdit();
  };

  const checkIsEdit = () => {
    let isEdit = false;
    const formDataInitialValue = authUser.success;

    isEdit =
      (getValues()['nickname'] &&
        formDataInitialValue?.nickname !== getValues()['nickname']) ||
      (getValues()['username'] &&
        formDataInitialValue?.username !== getValues()['username']) ||
      (getValues()['phone'] &&
        formDataInitialValue?.phone !== getValues()['phone']) ||
      (getValues()['sex'] &&
        formDataInitialValue?.sex !== getValues()['sex']) ||
      (getValues()['birthday'] &&
        formDataInitialValue?.birthday !== getValues()['birthday']);

    setIsEditData(isEdit);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data: User) => {
    const userLoggedId = auth().currentUser?.uid || '';

    dispatch(updateAuthUserDataRequest(userLoggedId, data));
  };

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
            defaultValue={authUser.success?.username}
            onChange={(text: string) => onChangeText('username', text)}
          />

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='@Apelido'
            defaultValue={authUser.success?.nickname}
            onChange={(text: string) =>
              onChangeText('nickname', text.includes('@') ? text : `@${text}`)
            }
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
            defaultValue={authUser.success?.phone}
            onChange={(text: string) => onChangeText('phone', text)}
          />

          <Input
            onSubmitEditing={handleSubmit(onSubmit)}
            style={{ marginBottom: SPACING.default }}
            placeholder='Data de aniversário'
            defaultValue={authUser.success?.birthday}
            onChange={(text: string) => onChangeText('birthday', text)}
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
                  {getValues()['sex'] || authUser.success?.sex || 'Genero'}
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
              <DropdownItem value='Feminino' text='Feminino' />
              <DropdownItem value='Masculino' text='Masculino' />
              <DropdownItem value='Outros' text='Outros' />
            </MenuOptions>
          </Menu>

          <Button
            isLoading={authUser.isLoading}
            backgroundColor={isEditData ? COLORS.primary : COLORS.gray500}
            disabled={!isEditData}
            style={{ marginTop: 60 }}
            onPress={handleSubmit(onSubmit)}
          >
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
