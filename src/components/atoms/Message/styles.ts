import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

export const Container = styled.View<{ from: string | '' }>`
  width: 100%;
  height: 60;
  align-items: center;
  border-radius: 12;
`;

export const TagMessage = styled.View<{ from: string | '' }>`
  height: 40;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
  border-radius: 12;
  background-color: ${({ from }) =>
    from === 'userLogged' ? COLORS.primary : 'white'};
  ${({ from }) => (from === 'userLogged' ? 'right: 0;' : 'left: 0;')}
`;
