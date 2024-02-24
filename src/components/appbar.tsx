import {View, Text, ViewStyle, Pressable} from 'react-native';
import React, {ReactNode} from 'react';
import Card from './card';
import BellIcon from '../../assets/notification-bell.svg';
import ArrowBack from '../../assets/arrow-back-ios.svg';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: ViewStyle;
  isPrimary?: boolean;
  centerComponent?: ReactNode;
  suffixComponent?: ReactNode;
  haveBackIcon? : boolean
};

const AppBar = ({
  style,
  isPrimary = false,
  centerComponent,
  suffixComponent,
  haveBackIcon = true
}: Props) => {

  const navigator = useNavigation();

const navigateBack = () => {navigator.goBack();};

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        ...style,
      }}>
      {isPrimary ? (
        <>
          <View>
            <Text style={{color: 'gray', fontSize: 14}}>
              Hello, Welcome Back!
            </Text>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
              Karanjit Singh
            </Text>
          </View>
          <Card style={{alignSelf: 'center', padding: 4, borderRadius: 6}}>
            <BellIcon height={24} width={24} />
          </Card>
        </>
      ) : (
        <>
        {haveBackIcon ?  <Pressable onPress={navigateBack} >
          <ArrowBack height={22} width={22} />
          </Pressable> : <View/>}
       
          <View>{centerComponent}</View>
          <View>{suffixComponent}</View>
        </>
      )}
    </View>
  );
};

export default AppBar;
