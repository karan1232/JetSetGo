import {
  View,
  Text,
  TextInput,
  ViewStyle,
  Platform,
  Pressable,
} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  placeHolder?: string;
  style?: ViewStyle;
  prefixIcon?: ReactNode;
  enabled?: boolean;
  onPress?: () => void;
  onTextChange? : (text: string) => void,
  value? : string
};

const TextField = ({
  placeHolder,
  style,
  prefixIcon,
  enabled,
  onPress,
  onTextChange,
  value
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#f1f2f3',
        alignSelf: 'stretch',
        paddingHorizontal: 16,
        paddingVertical: Platform.OS == 'android' ? 0 : 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}>
      {prefixIcon}
      <TextInput
      value={value}
      style={{color:"black"}}
        editable={enabled}
        placeholder={placeHolder}
        placeholderTextColor="gray"
        onChangeText={onTextChange}
      />
    </Pressable>
  );
};

export default TextField;
