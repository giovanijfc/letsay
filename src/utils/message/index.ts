import { Message } from '~/models/message';

export const orderByTimestamp = (
  messageA: Message,
  messageB: Message
): number => {
  const timestampA = parseInt(messageA.date);
  const timestampB = parseInt(messageB.date);

  if (timestampA < timestampB) {
    return -1;
  } else if (timestampA > timestampB) {
    return 1;
  } else {
    return 0;
  }
};
