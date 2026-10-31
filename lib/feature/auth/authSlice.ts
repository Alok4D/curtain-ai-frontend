import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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

// Initial state with cookie/localStorage hydration
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  try {
    const token = Cookies.get('accessToken') || localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return {
      user: user || null,
      token: token || null,
      isAuthenticated: !!(token && user),
    };
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Persist to cookies and localStorage
      Cookies.set('accessToken', token, { expires: 7 });
      Cookies.set('userRole', user.role, { expires: 7 });
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      Cookies.remove('accessToken');
      Cookies.remove('userRole');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setUser, updateUser, logOut } = authSlice.actions;

export default authSlice.reducer;

