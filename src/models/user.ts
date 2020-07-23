export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  token: string;
  nickname?: string | '';
  sex?: string | '';
  birthday?: string | '';
}

export interface UserPreviewChat {
  id: string;
  usernameOrNickname: string;
  otherUserId: string;
}
