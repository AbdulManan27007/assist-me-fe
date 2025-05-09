import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    putEditBid: builder.mutation({
      query: ({ bidId, user_id, listing_id, status, message, bid_amount }) => ({
        url: `/api/job-applications/${bidId}`,
        method: "PUT",
        body: { user_id, listing_id, status, message, bid_amount },
      }),
    }),
  }),
});

export const { usePutEditBidMutation } = householdApi;
