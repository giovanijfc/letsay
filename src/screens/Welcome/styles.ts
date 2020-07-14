import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.secondary};
  justify-content: space-around;
`;

export const AreaBottom = styled.View`
  padding-bottom: 70;
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
`;

export const ImageLogo = styled.Image`
  margin-top: 50;
  align-self: center;
`;

export const SpaceTop = styled.View`
  margin-top: ${SPACING.default};
`;
