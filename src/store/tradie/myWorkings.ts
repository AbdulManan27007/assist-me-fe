import { baseApi } from "../api/baseApi";

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkingLists: builder.query({
      query: (id) => `/api/job-applications/getlisting/${id}`,
      //user id = id
    }),
  }),
});

export const { useGetWorkingListsQuery } = householdApi;