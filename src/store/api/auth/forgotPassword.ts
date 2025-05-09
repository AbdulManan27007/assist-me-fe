import baseApi from "../baseApi";

interface SignupCredentials {
  email: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ForgotPassword: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useForgotPasswordMutation } = authApi;
