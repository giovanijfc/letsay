import styled from 'styled-components/native';

import SPACING from '~/utils/spacing';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${SPACING.default};
  padding-bottom: ${SPACING.default};
  margin-bottom: ${SPACING.huge};
`;
