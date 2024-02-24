import { View, Text, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'

type Props = {style? : ViewStyle, children? : ReactNode}

const Card = ({style,children}: Props) => {
  return (
    <View
        style={{
          elevation: 4,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset:  {width: 0, height: 1},
          shadowOpacity: 0.17,
          shadowRadius: 3.84,
          alignSelf:"flex-start",
          ...style
        }}>
        {children}
      </View>
  )
}

export default Card