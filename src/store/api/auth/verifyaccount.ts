import baseApi from "../baseApi";

interface SignupCredentials {
  code: string;
  email: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    VerifyAccount: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/verify-account",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useVerifyAccountMutation } = authApi;
