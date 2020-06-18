import { StatusBar } from 'react-native';

export const setStatusBar = (
  backgroundColor: string,
  lightStyle: boolean
): undefined => {
  StatusBar.setBackgroundColor(backgroundColor || 'white');
  StatusBar.setBarStyle(lightStyle ? 'light-content' : 'dark-content', true);

  return undefined;
};
