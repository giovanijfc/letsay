import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const Container = styled.KeyboardAvoidingView`
  flex: 2;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${COLORS.secondary};
  margin-bottom: ${SPACING.default};
`;
