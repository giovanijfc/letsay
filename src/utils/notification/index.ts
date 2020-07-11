import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { Notification } from '~/models/notification';

export const showNotification = (remoteMessage: Notification): void => {
  console.log(remoteMessage);

  if (Platform.OS === 'ios') {
    const {
      data: { notification }
    } = remoteMessage;

    PushNotification.localNotification({
      title: notification?.title || '',
      message: notification?.body || '',
      playSound: false,
      soundName: 'default'
    });
  } else {
    const { notification } = remoteMessage;

    PushNotification.localNotification({
      title: notification?.title || '',
      message: notification?.body || '',
      playSound: false,
      soundName: 'default',
      largeIcon: undefined,
      smallIcon: 'logo_foreground'
    });
  }
};
