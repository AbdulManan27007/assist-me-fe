import baseApi from "../baseApi";

interface SignupCredentials {
  email: string;
  token: string;
  newPassword: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ResetPassword: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useResetPasswordMutation } = authApi;
