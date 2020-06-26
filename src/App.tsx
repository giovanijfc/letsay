import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import Routes from '~/navigation/routes.tsx';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import { Provider } from 'react-redux';
import store from '~/redux';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
    setStatusBar(COLORS.secondary, true);
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
