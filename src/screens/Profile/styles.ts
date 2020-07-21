import styled from 'styled-components/native';

import COLORS from '~/utils/colors';
import SPACING from '~/utils/spacing';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${COLORS.secondary};
`;

export const Container = styled.KeyboardAvoidingView`
  height: 100%;
  flex: 1.5;
  background: ${COLORS.secondary};
`;

export const Header = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const Background = styled.ImageBackground.attrs({
  resizeMode: 'cover',
  imageStyle: {
    opacity: 0.1
  }
})`
  width: 100%;
  height: 100%;
  flex: 0.8;
  padding-left: ${SPACING.default};
  padding-right: ${SPACING.default};
  padding-top: ${SPACING.high};
  padding-bottom: ${SPACING.high};
`;

export const AreaInfo = styled.View``;

export const AreaRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: ${SPACING.large};
`;

export const WrapperDetails = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AreaSolicitations = styled.View`
  flex: 0.8;
  padding-left: ${SPACING.default};
  padding-right: ${SPACING.default};
  padding-top: ${SPACING.high};
  padding-bottom: ${SPACING.high};
`;

export const WrapperProfileInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
