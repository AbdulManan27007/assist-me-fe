import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTradieList: builder.query({
      query: () => `/api/dashboard/tradie-data`, 
    }),
  }),
});

export const { useGetTradieListQuery } = householdApi;