import { baseApi } from '../../api/baseApi';

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: 'admin' | 'user';
      phone?: string;
      avatarUrl?: string;
      location?: string;
      bio?: string;
    };
  };
}

export interface RegisterResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    phone?: string;
    avatarUrl?: string;
    location?: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Users'],
    }),

    register: builder.mutation<
      RegisterResponse,
      { name: string; email: string; password: string; phone?: string }
    >({
      query: (userData) => ({
        url: '/users/create-user',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),

    forgotPassword: builder.mutation<
      { success: boolean; message: string; data?: any },
      { email: string }
    >({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      { success: boolean; message: string; data?: any },
      { token?: string; password?: string; body?: { password: string } }
    >({
      query: (data) => {
        const token = data.token;
        const password = data.password || data.body?.password;
        return {
          url: `/auth/reset-password?token=${encodeURIComponent(token || '')}`,
          headers: token ? { authorization: `Bearer ${token}` } : {},
          method: 'POST',
          body: {
            token,
            password,
          },
        };
      },
    }),

    changePassword: builder.mutation<
      { success: boolean; message: string; data?: any },
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    getMe: builder.query<{ success: boolean; message: string; data: any }, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),

    updateProfile: builder.mutation<
      { success: boolean; message: string; data: any },
      { name?: string; phone?: string; location?: string; bio?: string; avatarUrl?: string }
    >({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    refreshToken: builder.mutation<
      { success: boolean; message: string; data: { accessToken: string } },
      { refreshToken?: string } | void
    >({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data || {},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useRefreshTokenMutation,
} = authApi;
