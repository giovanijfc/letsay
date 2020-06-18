import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import Routes from '~/navigation/routes.tsx';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
    setStatusBar(COLORS.secondary, true);
  }, []);

  return <Routes />;
};

export default App;
