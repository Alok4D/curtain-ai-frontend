import { baseApi } from '../../api/baseApi';

export interface DashboardStatsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    metrics: {
      aiPreviews: {
        total: number;
        change: string;
        label: string;
        subtitle: string;
      };
      activeCatalog: {
        total: number;
        change: string;
        categories: {
          curtains: number;
          sheers: number;
          rollers: number;
        };
        label: string;
        subtitle: string;
      };
      totalUsers: {
        total: number;
        change: string;
        label: string;
        subtitle: string;
      };
      consultationPipeline: {
        value: string;
        change: string;
        label: string;
        subtitle: string;
      };
    };
    recentUsers: Array<{
      _id?: string;
      name: string;
      email: string;
      role: string;
      status?: string;
      phone?: string;
      location?: string;
      createdAt?: string;
    }>;
    recentPreviews: Array<{
      _id?: string;
      id?: number;
      roomImage?: string;
      fittedImage?: string;
      fabricName?: string;
      category?: string;
      time?: string;
      createdAt?: string;
      userId?: {
        name?: string;
        email?: string;
      };
    }>;
  };
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => ({
        url: '/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminApi;
