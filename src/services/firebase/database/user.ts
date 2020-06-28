import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export interface UserToCreate {
  id?: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

export const create = async (userToRegister: UserToCreate): Promise<void> => {
  const { user } = await auth().createUserWithEmailAndPassword(
    userToRegister.email,
    userToRegister.password
  );
  userToRegister.id = user.uid;
  delete userToRegister['password'];
  await database().ref(`/users/${userToRegister.id}`).set(userToRegister);
};
