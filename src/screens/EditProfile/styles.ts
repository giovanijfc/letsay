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

export const Header = styled.View`
  align-items: flex-end;
`;
