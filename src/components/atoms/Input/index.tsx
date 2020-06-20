import React, { memo, useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import * as Styled from './styles';
import { Text } from '../Text/styles';

interface Props {
  placeholder?: string | '';
  defaultValue?: string | '';
  type?: string | 'text';
  style?: StyleProp<TextStyle> | null;
  onChange(text: string): void;
}

const Input: React.FC<Props> = ({
  placeholder,
  defaultValue,
  style,
  type,
  onChange
}) => {
  const [isShowContent, setIsShowContent] = useState(false);

  return (
    <Styled.Container style={style}>
      <Styled.Input
        defaultValue={defaultValue}
        placeholder={placeholder}
        secureTextEntry={type === 'restrict' && !isShowContent}
        onChangeText={onChange}
      />

      {type === 'restrict' && (
        <Text onPress={() => setIsShowContent(prevState => !prevState)}>
          {isShowContent ? 'Esconder' : 'Revelar'}
        </Text>
      )}
    </Styled.Container>
  );
};

export default memo(Input);
