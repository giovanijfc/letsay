import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

export const Container = styled.View`
  width: 100%;
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
  background-color: ${COLORS.terciary};
  border-radius: 100;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: COLORS.gray500
})`
  flex: 1;
  font-size: 18;
  font-family: 'Graphik-Regular';
  color: white;
  font-weight: 500;
`;

export const InputMask = styled(TextInputMask).attrs({
  placeholderTextColor: COLORS.gray500
})`
  flex: 1;
  font-size: 18;
  font-family: 'Graphik-Regular';
  color: white;
  font-weight: 500;
`;
