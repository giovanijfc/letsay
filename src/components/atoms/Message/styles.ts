import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';
import COLORS from '~/utils/colors';

export const Container = styled.View<{ from: string | '' }>`
  align-items: ${({ from }) =>
    from === 'userLogged' ? 'flex-end' : 'flex-start'};
  margin-bottom: ${SPACING.high};
`;

export const TagMessage = styled.View<{ from: string | '' }>`
  max-width: 80%;
  padding-left: ${SPACING.large};
  padding-right: ${SPACING.large};
  padding-top: ${SPACING.small};
  padding-bottom: ${SPACING.small};
  border-top-left-radius: 12;
  border-bottom-left-radius: ${({ from }) => (from === 'userLogged' ? 12 : 0)};
  border-bottom-right-radius: ${({ from }) => (from === 'userLogged' ? 0 : 12)};
  border-top-right-radius: 12;
  background-color: ${({ from }) =>
    from === 'userLogged' ? COLORS.primary : 'white'};
  ${({ from }) => (from === 'userLogged' ? 'right: 0;' : 'left: 0;')}
`;
