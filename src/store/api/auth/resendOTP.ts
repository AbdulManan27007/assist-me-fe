import baseApi from "../baseApi";

interface SignupCredentials {
  email: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ResendOTP: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/resend-verification",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useResendOTPMutation } = authApi;
