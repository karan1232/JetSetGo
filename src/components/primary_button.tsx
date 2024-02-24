import {View, Text, Pressable, ViewStyle} from 'react-native';
import React from 'react';

type Props = {onPress? : () => void, btnName? : string, style? : ViewStyle};

const PrimaryButton = ({onPress, btnName, style}: Props) => {
  return (
    <Pressable
    onPress={onPress}
      style={{
        alignSelf: 'stretch',
        backgroundColor: 'black',
        paddingVertical: 14,
        borderRadius: 10,
        ...style
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
        }}>
        {btnName}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;
