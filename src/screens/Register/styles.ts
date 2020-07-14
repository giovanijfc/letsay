import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.secondary};
  padding-top: ${SPACING.high};
`;

export const Container = styled.View`
  padding-top: ${SPACING.high};
  padding-bottom: ${SPACING.high};
  padding-left: ${SPACING.high};
  padding-right: ${SPACING.high};
  background: ${COLORS.secondary};
`;

export const AreaForm = styled.KeyboardAvoidingView`
  padding-left: ${SPACING.nano};
  margin-top: 50;
`;
