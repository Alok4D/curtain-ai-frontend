import { baseApi } from '../../api/baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardOverview: builder.query<any, void>({
      query: () => ({
        url: '/admin/overview',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetAdminDashboardOverviewQuery } = adminApi;

