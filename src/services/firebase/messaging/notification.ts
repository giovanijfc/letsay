import axios from 'axios';

export const sendNotification = async (
  title: string,
  body: string,
  tokens: string[]
): Promise<void> => {
  const FIREBASE_API_KEY =
    'AAAAzVUdv-c:APA91bEmCrd1TYg8Y5IxdBt2QrG4wxuoB4hwDYVWpy15H5trwKjchmvrc2U6pgDVHo4sDyTHgHZOfF72XAMrRGSY8Czqo8oL4eM67WnZ7zY0Qw5KMmccWkYPSyGQT1BrRnH8TQ-57He7';
  const authorization = `key=${FIREBASE_API_KEY}`;

  const message = {
    registration_ids: tokens,
    notification: {
      title,
      body,
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: 'high',
      content_available: true
    },
    data: {
      title,
      body
    }
  };

  await axios.post('https://fcm.googleapis.com/fcm/send', message, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization
    }
  });
};
