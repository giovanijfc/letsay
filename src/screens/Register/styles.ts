import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.secondary};
`;

export const AreaText = styled.View`
  height: 50%;
  width: 80%;
`;

export const AreaBottom = styled.View`
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  padding-top: ${SPACING.high};
  padding-bottom: ${SPACING.high};
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
`;

export const ImageLogo = styled.Image`
  position: absolute;
  top: 200;
  align-self: center;
`;
