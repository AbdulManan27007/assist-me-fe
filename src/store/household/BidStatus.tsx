import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    putBidStatus: builder.mutation({
      query: ({ id, listing_id }) => ({
        url: `/api/job-applications/update-status`,
        method: "PUT",
        body: { id, listing_id },
      }),
    }),
  }),
});

export const { usePutBidStatusMutation } = householdApi;