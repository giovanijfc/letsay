/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '~/screens/Welcome';
import Login from '~/screens/Login';
import Register from '~/screens/Register';
import ForgotPassword from '~/screens/ForgotPassword';

import NewChat from '~/screens/NewChat';
import Chat from '~/screens/Chat';
import Home from '~/screens/Home';

import Profile from '~/screens/Profile';
import EditProfile from '~/screens/EditProfile';

import TabBar from './TabBar';

export const ProfileBarStack: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Profile}
        name='Profile'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const ChatBarStack: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name='Chats'
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Routes: React.FC<{ hasUserAuthenticate: boolean }> = ({
  hasUserAuthenticate
}) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {hasUserAuthenticate ? (
        <Stack.Navigator>
          <Stack.Screen
            name='HomeTabBar'
            component={TabBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NewChat'
            component={NewChat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Chat'
            component={Chat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={EditProfile}
            name='EditProfile'
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='Welcome'
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
