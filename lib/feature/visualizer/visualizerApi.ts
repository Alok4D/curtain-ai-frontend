import { baseApi } from '../../api/baseApi';

export interface GenerateVisualizerPayload {
  roomImage: string;
  curtainImage: string;
  curtainId?: number | string;
  curtainName?: string;
  drapeLength?: string;
  drapePosition?: string;
  curtainRod?: string;
}

export interface GenerateVisualizerResponse {
  success: boolean;
  message?: string;
  data: {
    imageUrl: string;
    curtainName?: string;
    savedInHistory?: boolean;
    _id?: string;
  };
}

export const visualizerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCurtainPreview: builder.mutation<GenerateVisualizerResponse, GenerateVisualizerPayload>({
      query: (body) => ({
        url: '/visualizer/generate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Visualizer', 'Dashboard'],
    }),
    getRecentVisualizations: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => ({
        url: '/visualizer/recent',
        method: 'GET',
      }),
      providesTags: ['Visualizer'],
    }),
  }),
  overrideExisting: true,
});

export const { useGenerateCurtainPreviewMutation, useGetRecentVisualizationsQuery } = visualizerApi;

