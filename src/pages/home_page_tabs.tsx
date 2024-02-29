import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './home_page/home_page';
import ExplorePage from './explore_page/explore_page';
import HomeSvg from '../../assets/home.svg';
import ExploreSvg from '../../assets/explore.svg';
import TryPage from './try_page';

type LandingPageProps = {};

const Tab = createBottomTabNavigator();

const HomePageTabs = (props: LandingPageProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <HomeSvg color={focused ? color : 'gray'} height={20} width={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExplorePage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <ExploreSvg
              color={focused ? color : 'gray'}
              height={24}
              width={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomePageTabs;
