export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  token: string;
}

export interface UserPreviewChat {
  id: string;
  username: string;
  otherUserId: string;
}
