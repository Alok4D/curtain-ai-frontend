import { baseApi } from '../../api/baseApi';

export type TCurtainCategory = 'curtains' | 'sheers' | 'rollers';

export interface ICurtain {
  _id?: string;
  id?: number;
  name: string;
  category: TCurtainCategory;
  colors?: string[];
  fabric?: string;
  pattern?: string;
  style?: string[];
  opacity?: string;
  texture?: string;
  suitableRooms?: string[];
  images?: string[];
  isActive?: boolean;
  image_url?: string;
  display_image_url?: string;
  material?: string;
  inStock?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RecommendedCurtainItem extends ICurtain {
  matchScore?: number;
  matchPercentage?: number;
  specialistNote?: string;
}

export interface RecommendationResponseData {
  roomSummary: string;
  specialistAdvice: string;
  primaryStyle: string;
  detectedRoom: string;
  recommendedCategories: string[];
  recommendedColors: string[];
  recommendedCurtains: RecommendedCurtainItem[];
  allCurtainsCount: number;
}

export interface CurtainRecommendationResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: RecommendationResponseData;
}

export interface CurtainsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICurtain[];
}

export interface SingleCurtainResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICurtain;
}

export const curtainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurtains: builder.query<
      CurtainsResponse,
      { category?: string; searchTerm?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.category && params.category !== 'all') {
          queryParams.append('category', params.category);
        }
        if (params?.searchTerm) {
          queryParams.append('searchTerm', params.searchTerm);
        }
        const queryString = queryParams.toString();
        return {
          url: queryString ? `/curtains?${queryString}` : '/curtains',
          method: 'GET',
        };
      },
      providesTags: ['Curtains'],
    }),

    getCurtainById: builder.query<SingleCurtainResponse, string | number>({
      query: (id) => ({
        url: `/curtains/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Curtains', id }],
    }),

    createCurtain: builder.mutation<SingleCurtainResponse, Partial<ICurtain>>({
      query: (data) => ({
        url: '/curtains',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Curtains'],
    }),

    updateCurtain: builder.mutation<
      SingleCurtainResponse,
      { id: string | number; body: Partial<ICurtain> }
    >({
      query: ({ id, body }) => ({
        url: `/curtains/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Curtains'],
    }),

    deleteCurtain: builder.mutation<
      { statusCode: number; success: boolean; message: string; data?: any },
      string | number
    >({
      query: (id) => ({
        url: `/curtains/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Curtains'],
    }),

    seedCurtains: builder.mutation<
      { statusCode: number; success: boolean; message: string; data: any },
      void
    >({
      query: () => ({
        url: '/curtains/seed',
        method: 'GET',
      }),
      invalidatesTags: ['Curtains'],
    }),

    recommendCurtains: builder.mutation<
      CurtainRecommendationResponse,
      { roomImage: string }
    >({
      query: (body) => ({
        url: '/curtains/recommend',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCurtainsQuery,
  useGetCurtainByIdQuery,
  useCreateCurtainMutation,
  useUpdateCurtainMutation,
  useDeleteCurtainMutation,
  useSeedCurtainsMutation,
  useRecommendCurtainsMutation,
} = curtainApi;
