import baseApi from "../baseApi";

interface SignupCredentials {
  email: string;
  code: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ForgotPasswordOTP: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/verify-forgot-otp",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});
export const { useForgotPasswordOTPMutation } = authApi;
