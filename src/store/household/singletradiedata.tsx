import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleTradieData: builder.query({
      query: (tradieId) => `/api/dashboard/tradie-data/${tradieId}`, 
    }),
  }),
});

export const { useGetSingleTradieDataQuery } = householdApi;
