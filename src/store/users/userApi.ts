import { baseApi } from "../api/baseApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUser } from "../type";

interface UserState {
  users: GetUser[];
  totalUsers: number;
  totalHouseholds: number;
  totalTradies: number;
  recentUsersCount: number;
  newUsersCount: number;
  recentHouseholds: number;
  recentTradies: number;
  newHouseholds: number;
  newTradies: number;
  percentageRecentUsers: string;
  percentageRecentNewUsers: string;
  percentageRecentHouseholds7Days: string;
  percentageRecentTradies7Days: string;
}

const initialState: UserState = {
  users: [],
  totalUsers: 0,
  totalHouseholds: 0,
  totalTradies: 0,
  recentUsersCount: 0,
  newUsersCount: 0,
  recentHouseholds: 0,
  recentTradies: 0,
  newHouseholds: 0,
  newTradies: 0,
  percentageRecentUsers: "0",
  percentageRecentNewUsers: "0",
  percentageRecentHouseholds7Days: "0",
  percentageRecentTradies7Days: "0",
};

export const userApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUsers: builder.query<GetUser[], void>({
      query: () => "api/user/list",
      providesTags: [{ type: "Users", id: "LIST" }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const filteredData = data.filter(user => user.role !== "admin");

          const now = Date.now();
          const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
          const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

          const totalUsers = filteredData.length;
          const totalHouseholds = filteredData.filter(user => user.role === "household").length;
          const totalTradies = filteredData.filter(user => user.role === "tradie").length;

          const newUsers = filteredData.filter(user => {
            const createdAt = user.created_at ? new Date(user.created_at).getTime() : 0;
            return createdAt >= thirtyDaysAgo && createdAt <= now;
          });

          const recentUsers = newUsers.filter(user => {
            const createdAt = user.created_at ? new Date(user.created_at).getTime() : 0;
            return createdAt >= sevenDaysAgo;
          });

          const newHouseholds = newUsers.filter(user => user.role === "household").length;
          const newTradies = newUsers.filter(user => user.role === "tradie").length;
          const recentHouseholds = recentUsers.filter(user => user.role === "household").length;
          const recentTradies = recentUsers.filter(user => user.role === "tradie").length;

          const calcPercentage = (count: number, total: number) => 
            total > 0 ? Math.floor((count / total) * 100).toString() : "0";

          dispatch(
            setUsers({
              users: filteredData,
              totalUsers,
              totalHouseholds,
              totalTradies,
              recentUsersCount: recentUsers.length,
              newUsersCount: newUsers.length,
              recentHouseholds,
              recentTradies,
              newHouseholds,
              newTradies,
              percentageRecentUsers: calcPercentage(recentUsers.length, totalUsers),
              percentageRecentNewUsers: calcPercentage(recentUsers.length, newUsers.length), 
              percentageRecentHouseholds7Days: calcPercentage(recentHouseholds, totalHouseholds),
              percentageRecentTradies7Days: calcPercentage(recentTradies, totalTradies),
            })
          );
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
    }),

     deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log(`User ${id} deleted successfully.`);
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
    }),

    updateUser: builder.mutation<GetUser, { userId: string; userDto: Partial<GetUser> }>({
      query: ({ userId, userDto }) => ({
        url: `api/user/${userId}`,
        method: "PUT",
        body: userDto,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      async onQueryStarted({ userId, userDto }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`User ${userId} updated successfully:`, data);
        } catch (error) {
          console.error("Error updating user:", error);
        }
      },
    }),

    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "s3/upload",
        method: "POST",
        body: formData,
      }),
    }),

  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useUploadFileMutation } = userApi;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUsers } = userSlice.actions;
export const userReducer = userSlice.reducer;
