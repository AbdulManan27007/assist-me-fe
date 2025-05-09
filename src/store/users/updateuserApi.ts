import { UsersRoundIcon } from "lucide-react";
import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: true, 
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ userId, userData }) => {
        // console.log("_____data", userData); `
        // console.log("id", userId); 
        return {
          url: `api/user/${userId}`,
          method: "PUT",
          body: userData,
        };
      },
    }),
  }),
});


export const { useUpdateUserMutation } = userApi;
