/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegisterScreen from './src/components/pages/RegisterScreen';
import LoginScreen from './src/components/pages/LoginScreen';
import FeedScreen from './src/components/pages/FeedScreen';
import UploadScreen from './src/components/pages/UploadScreen';
import UserScreen from './src/components/pages/UserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case "Feed":
            iconName = focused ? 'planet' : 'planet-outline';
            break;
          case "Upload":
            iconName = focused ? 'mic' : 'mic-outline';
            break;
          case "User":
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            break;
        } 

        return <Ionicons name={iconName} size={size} color={color} />;
      }
    })}
    tabBarOptions={{
      activeTintColor: 'rgb(52,152,219)',
      inactiveTintColor: 'rgb(127,140,141)',
      showLabel: false
    }}
  >
    <Tab.Screen 
      name="Feed" 
      component={FeedScreen} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Upload" 
      component={UploadScreen} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="User" 
      component={UserScreen} 
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeTabScreen}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
