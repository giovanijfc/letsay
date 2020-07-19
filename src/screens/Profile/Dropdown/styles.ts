import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';

export const Container = styled.KeyboardAvoidingView`
  height: 100%;
  width: 100%;
  position: absolute;
  padding-top: ${SPACING.high};
  z-index: 2;
`;

export const Header = styled.View`
  align-items: flex-end;
`;
