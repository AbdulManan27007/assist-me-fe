import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBidsOnListing: builder.query({
      query: (id) => `/api/job-applications/listing/${id}/users`,
      //listingId = id
    }),
  }),
});

export const { useGetBidsOnListingQuery } = householdApi;
