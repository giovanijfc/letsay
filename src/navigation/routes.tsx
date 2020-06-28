/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '~/screens/Welcome';
import Login from '~/screens/Login';
import Register from '~/screens/Register';
import ForgotPassword from '~/screens/ForgotPassword';
import Home from '~/screens/Home';

const Routes: React.FC<{ hasUserAuthenticate: boolean }> = ({
  hasUserAuthenticate
}) => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {hasUserAuthenticate ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
