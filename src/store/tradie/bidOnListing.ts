import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bidOnListing: builder.mutation({
      query: (data) => ({
        url: "/api/job-applications",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBidOnListingMutation } = householdApi;
