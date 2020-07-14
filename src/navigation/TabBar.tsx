import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Chats from '~/screens/Chats';

const Tab = createBottomTabNavigator();

const TabBar: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Chats' component={Chats} />
    </Tab.Navigator>
  );
};

export default TabBar;
