/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo, useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInputMaskTypeProp } from 'react-native-masked-text';

import * as Styled from './styles';
import { Text } from '../Text/styles';

interface Mask {
  options: unknown;
  type: TextInputMaskTypeProp;
}

interface Props {
  placeholder?: string | '';
  defaultValue?: string | '';
  type?: string | 'text';
  style?: StyleProp<TextStyle> | null;
  keyboardType?: string | 'default';
  onChange(text: string): void;
  mask?: Mask | undefined;
  onSubmitEditing?(): void;
}

const Input: React.FC<Props> = ({
  placeholder,
  defaultValue,
  style,
  type,
  keyboardType,
  onChange,
  mask,
  onSubmitEditing
}) => {
  const [isShowContent, setIsShowContent] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    <Styled.Container style={style}>
      {mask ? (
        <Styled.InputMask
          onSubmitEditing={onSubmitEditing}
          defaultValue={defaultValue}
          placeholder={placeholder}
          secureTextEntry={type === 'restrict' && !isShowContent}
          onChangeText={text => {
            if (typeof onChange === 'function') {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              onChange(text);
            }

            setValue(text);
          }}
          type={mask.type}
          value={value}
          options={mask.options}
        />
      ) : (
        <Styled.Input
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          secureTextEntry={type === 'restrict' && !isShowContent}
          onChangeText={text => {
            if (typeof onChange === 'function') {
              onChange(text);
            }
          }}
        />
      )}

      {type === 'restrict' && (
        <Text onPress={() => setIsShowContent(prevState => !prevState)}>
          {isShowContent ? 'Esconder' : 'Revelar'}
        </Text>
      )}
    </Styled.Container>
  );
};

export default memo(Input);
