import React, { useEffect } from 'react';
import { Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Text>aaa</Text>;
};

export default App;
