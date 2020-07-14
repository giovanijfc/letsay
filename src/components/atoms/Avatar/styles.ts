import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ImageAvatar = styled.Image.attrs({
  resizeMode: 'cover'
})`
  flex: 1;
  width: 100%;
  height: 100%;
`;
