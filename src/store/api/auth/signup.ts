import baseApi from "../baseApi";

interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    Signup: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation } = authApi;
