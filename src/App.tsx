import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import { MenuProvider } from 'react-native-popup-menu';

import Routes from '~/navigation/routes.tsx';

import { setStatusBar } from '~/utils/statusBar';
import COLORS from '~/utils/colors';

import { Provider } from 'react-redux';
import store from '~/redux';

const App: React.FC = () => {
  const [hasUserAuthenticate, setHasUserAuthenticate] = useState(false);

  useEffect(() => {
    setStatusBar(COLORS.separator, true);

    auth().onAuthStateChanged(auth => {
      setHasUserAuthenticate(Boolean(auth));
      SplashScreen.hide();
    });
  }, []);

  return (
    <Provider store={store}>
      <MenuProvider>
        <Routes hasUserAuthenticate={hasUserAuthenticate} />
      </MenuProvider>
    </Provider>
  );
};

export default App;
