import { baseApi } from "../api/baseApi"; // Assuming you have a baseApi already set up

export const householdApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalTasks: builder.query({
      query: (householdId) => `/api/dashboard/household/${householdId}/total-tasks`,
    }),
  }),
});

export const { useGetTotalTasksQuery } = householdApi;
