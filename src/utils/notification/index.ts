import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { Notification } from '~/models/notification';

export const showNotification = (remoteMessage: Notification): void => {
  const { data } = remoteMessage;

  if (Platform.OS === 'ios') {
    PushNotification.localNotification({
      title: data?.title || '',
      message: data?.body || '',
      playSound: false,
      soundName: 'default'
    });
  } else {
    PushNotification.localNotification({
      title: data?.title || '',
      message: data?.body || '',
      playSound: false,
      soundName: 'default',
      largeIcon: undefined,
      smallIcon: 'logo_foreground'
    });
  }
};
