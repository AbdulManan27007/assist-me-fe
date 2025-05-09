import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHiredTradies: builder.query({
      query: (id) => {
        // This will only be called if skip is false
        return `/api/job-applications/hired-tradie/${id}`;
      },
      keepUnusedDataFor: 60, 
    }),
  }),
});

export const { useGetHiredTradiesQuery } = householdApi;