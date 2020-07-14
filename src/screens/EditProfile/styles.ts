import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.separator};
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${COLORS.secondary};
  padding-top: ${SPACING.high};
  padding-bottom: ${SPACING.high};
  padding-left: ${SPACING.high};
  padding-right: ${SPACING.high};
`;

export const AreaForm = styled.KeyboardAvoidingView`
  padding-left: ${SPACING.nano};
  margin-top: 50;
`;

export const WrapperTrigger = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
  background-color: ${COLORS.terciary};
  border-radius: 100;
`;
