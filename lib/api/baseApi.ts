import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  if (envUrl.endsWith('/api/v1')) return envUrl;
  if (envUrl.endsWith('/api')) return `${envUrl}/v1`;
  return `${envUrl.replace(/\/+$/, '')}/api/v1`;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      // Get token from Redux state or Cookies/LocalStorage fallback
      const token =
        state.auth?.token ||
        state.auth?.user?.token ||
        Cookies.get('accessToken') ||
        (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Curtains', 'Visualizer', 'Dashboard', 'Auth'],
  endpoints: () => ({}),
});

