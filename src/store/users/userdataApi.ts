import { baseApi } from './../api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "api/user",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
