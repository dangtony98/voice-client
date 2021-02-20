/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import 'react-native-gesture-handler';
import moment from 'moment';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/components/screens/RegisterScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import WelcomeScreen from './src/components/screens/WelcomeScreen';
import FeedScreen from './src/components/screens/FeedScreen';
import UploadScreen from './src/components/screens/UploadScreen';
import UserScreen from './src/components/screens/UserScreen';
import SplashScreen from './src/components/screens/SplashScreen';
import ProfileScreen from './src/components/screens/ProfileScreen';
import NotificationsScreen from './src/components/screens/NotificationsScreen';
import {getUser} from './src/service/api/users';
import {
  handleFCMToken,
  requestUserPermission,
} from './src/service/notifications/notifications';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: function (number, withoutSuffix) {
      return withoutSuffix ? 'now' : 'a few seconds';
    },
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mth',
    MM: '%dmth',
    y: '1y',
    yy: '%dy',
  },
});

const AuthStack = createStackNavigator();
const FeedStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Insert Profile Screen onto this stack
const FeedStackScreen = () => {
  return (
    <FeedStack.Navigator screenOptions={{headerShown: false}}>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="Profile" component={ProfileScreen} />
      <FeedStack.Screen name="Notifications" component={NotificationsScreen} />
    </FeedStack.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Feed':
              iconName = focused ? 'planet' : 'planet-outline';
              break;
            case 'Upload':
              iconName = focused ? 'mic' : 'mic-outline';
              break;
            case 'User':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgb(52,152,219)',
        inactiveTintColor: 'rgb(127,140,141)',
        showLabel: false,
      }}
      backBehavior="none">
      <Tab.Screen name="Feed" component={FeedStackScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

const App: () => React$Node = () => {
  const [validToken, setValidToken] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await handleFCMToken();
      await requestUserPermission();

      let userToken;
      try {
        // case: try restore token from AsyncStorage
        userToken = await AsyncStorage.getItem('userToken');
        getUser(
          userToken,
          () => {
            // case: valid token
            setValidToken(true);
          },
          () => {
            // case: invalid token
            setValidToken(false);
          },
        );
      } catch (e) {
        // case: restore token failed
        setValidToken(false);
      }
    };
    bootstrapAsync();
  });

  const renderScreen = (validToken) => {
    switch (validToken) {
      case null:
        // render Splash screen
        return <AuthStack.Screen name="Splash" component={SplashScreen} />;
      case false:
        // render Login screen
        return (
          <>
            <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="Main" component={HomeTabScreen} />
          </>
        );
      case true:
        // render Main screen
        return <AuthStack.Screen name="Main" component={HomeTabScreen} />;
    }
  };

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            {renderScreen(validToken)}
          </AuthStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
