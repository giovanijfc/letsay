import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ChatStack } from './routes';

import COLORS from '~/utils/colors';

import logoIc from '~/assets/img/logo.png';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
void IconAntDesign.loadFont();

const Tab = createMaterialBottomTabNavigator();

const TabBar: React.FC = () => {
  return (
    <Tab.Navigator
      activeColor={COLORS.primary}
      inactiveColor={COLORS.gray500}
      labeled
      barStyle={{ backgroundColor: COLORS.separator }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          const size = 20;
          const sizeFocused = 23;
          const style = { width: size, height: size, tintColor: color };
          const styleFocused = {
            width: sizeFocused,
            height: sizeFocused,
            tintColor: color
          };

          switch (route.name) {
            case 'Chats':
              return (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <Image source={logoIc} style={focused ? styleFocused : style} />
              );
            case 'Perfil':
              return (
                <IconAntDesign
                  name='user'
                  color={color}
                  size={focused ? sizeFocused : size}
                />
              );
            default:
              return null;
          }
        }
      })}
    >
      <Tab.Screen name='Chats' component={ChatStack} />
      <Tab.Screen name='Perfil' component={ChatStack} />
    </Tab.Navigator>
  );
};

export default TabBar;
