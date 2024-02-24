import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/pages/home_page/home_page';
import LandingPage from './src/pages/home_page_tabs';
import HomePageTabs from './src/pages/home_page_tabs';
import SearchedFlightsPage from './src/pages/home_page/searched_flights_page';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  HomePageTabs: undefined;
  HomePage: { userId: string };
  SearchedFlightsPage: {arrival: "", departure: "", date: string};
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen name="HomePageTabs" component={HomePageTabs} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="SearchedFlightsPage"
          component={SearchedFlightsPage}
          initialParams={{arrival: "", departure: ""}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
