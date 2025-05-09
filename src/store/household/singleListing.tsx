import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneListing: builder.query({
      query: (taskid) => `/api/listings/${taskid}`, 
    }),
  }),
});

export const { useGetOneListingQuery } = householdApi;
