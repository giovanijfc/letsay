import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100;
  align-items: center;
  flex-direction: row;
  padding-top: ${SPACING.default};
  padding-bottom: ${SPACING.default};
  background-color: ${COLORS.secondary};
  border-bottom-color: ${COLORS.separator};
  border-bottom-width: 2;
`;

export const WrapperEnd = styled.View`
  width: 100%;
  justify-content: flex-end;
`;
