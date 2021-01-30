/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/components/screens/RegisterScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import FeedScreen from './src/components/screens/FeedScreen';
import UploadScreen from './src/components/screens/UploadScreen';
import UserScreen from './src/components/screens/UserScreen';
import SplashScreen from './src/components/screens/SplashScreen';

import { get_user } from './src/service/api/users';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabScreen() {
  return(
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
  
          return <Icon name={iconName} size={size} color={color} />;
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
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen} 
      />
      <Tab.Screen 
        name="User" 
        component={UserScreen} 
      />
    </Tab.Navigator>
  );
} 

const App: () => React$Node = () => {
  const [validToken, setValidToken] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken; 
      try {
        // case: try restore token from AsyncStorage
        userToken = await AsyncStorage.getItem('userToken');
        get_user(userToken,
          () => {
            // case: valid token
            setValidToken(true);
          },
          () => {
            // case: invalid token
            setValidToken(false);
          });
      } catch (e) {
        // case: restore token failed
        setValidToken(false);
      }      
    }
    bootstrapAsync();
  });

  const renderScreen = (validToken) => {
    switch (validToken) {
      case null:
        // render Splash screen
        return (
          <AuthStack.Screen 
            name="Splash"
            component={SplashScreen}
          />
        );
        break;
      case false:
        return (
          <>
            <AuthStack.Screen 
              name="Login" 
              component={LoginScreen} 
            />
            <AuthStack.Screen 
              name="Register" 
              component={RegisterScreen}
            />
            <AuthStack.Screen
              name="Main"
              component={HomeTabScreen}
            />
          </>
        );
        // render Login screen
        break;
      case true:
        // render Main screen
        return (
          <AuthStack.Screen
            name="Main"
            component={HomeTabScreen}
          />
        );
        break;
    }
  }

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack.Navigator 
            screenOptions={{ headerShown: false }}
          >
            {renderScreen(validToken)}
          </AuthStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
