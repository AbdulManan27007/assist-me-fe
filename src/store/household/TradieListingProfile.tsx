import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTradieListingProfile: builder.query({
      query: (bidId) => `/api/job-applications/tradie-list/${bidId}`, 
      transformResponse: (response : any) => response[0] || null,
    }),
  }),
});

export const { useGetTradieListingProfileQuery } = householdApi;
