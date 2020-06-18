import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import Routes from '~/navigation/routes.tsx';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Routes />;
};

export default App;
