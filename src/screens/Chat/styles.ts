import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.secondary};
`;

export const Container = styled.KeyboardAvoidingView`
  height: 100%;
  padding-left: ${SPACING.high};
  padding-right: ${SPACING.high};
  background: ${COLORS.secondary};
`;
