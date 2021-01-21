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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RegisterScreen from './src/components/pages/RegisterScreen';
import LoginScreen from './src/components/pages/LoginScreen';
import FeedScreen from './src/components/pages/FeedScreen';
import UploadScreen from './src/components/pages/UploadScreen';
import UserScreen from './src/components/pages/UserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabScreen = () => (
  <Tab.Navigator>
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
