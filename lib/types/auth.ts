export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

