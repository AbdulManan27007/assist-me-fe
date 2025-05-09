import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleSignup: builder.query({
      query: () => ({
        url: `/api/v1/auth/google`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGoogleSignupQuery } = authApi;
