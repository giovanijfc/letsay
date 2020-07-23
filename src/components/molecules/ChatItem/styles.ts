import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 110;
  flex-direction: row;
  padding-top: ${SPACING.default};
  padding-bottom: ${SPACING.default};
`;

export const AreaInfo = styled.View`
  flex: 1;
  height: 75;
  flex-direction: column;
  margin-left: ${SPACING.large};
  margin-top: ${SPACING.default};
  border-bottom-color: ${COLORS.separator};
  border-bottom-width: 2;
`;

export const WrapperHeaderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Ball = styled.View`
  width: 18;
  height: 18;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.primary};
  border-radius: 100;
  margin-right: ${SPACING.default};
`;

export const AreaRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
