import database, {
  FirebaseDatabaseTypes
} from '@react-native-firebase/database';
import Fauth from '@react-native-firebase/auth';

import { User } from '~/models/user';
import { Credentials } from '~/models/credentials';

export const register = async (userToRegister: User): Promise<void> => {
  const userCreated = await Fauth().createUserWithEmailAndPassword(
    userToRegister.email,
    userToRegister.password
  );
  userToRegister.id = userCreated.user.uid;
  delete userToRegister['password'];
  await database().ref(`/users/${userToRegister.id}`).set(userToRegister);
};

export const auth = async (credentials: Credentials): Promise<User> => {
  const { user } = await Fauth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password
  );

  const snapshotUser: FirebaseDatabaseTypes.DataSnapshot = await database()
    .ref(`/users/${user.uid}`)
    .once('value');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userCompleted: User = { ...snapshotUser.val() };

  return userCompleted;
};

export const getAll = async (): Promise<User[]> => {
  const userLoggedId = Fauth().currentUser?.uid;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let users: User[] = Object.values(
    await (await database().ref('/users/').once('value')).val()
  );

  users = users.filter(({ id }) => id !== userLoggedId);

  return users;
};
