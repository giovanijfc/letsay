import rtDatabase from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

interface User {
  id?: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

export const createUser = async (userToRegister: User): Promise<void> => {
  const { user } = await auth().createUserWithEmailAndPassword(
    userToRegister.email,
    userToRegister.password
  );
  userToRegister.id = user.uid;
  await rtDatabase().ref('/users').set(userToRegister);
};
