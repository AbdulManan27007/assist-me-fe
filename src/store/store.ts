import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi"; 
import { listingsApi } from "./listings/listingsApi";
import { HouseHoldProfileApi } from "./household/householdprofile";
import { userReducer } from "./users/userApi"; // Ensure only userReducer is imported

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Use baseApi.reducer instead of individual APIs
    HouseHoldProfileApi: HouseHoldProfileApi.reducer, // Add household profile API reducer
    users: userReducer, // Redux slice for storing users
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware) // Add baseApi middleware
      .concat(HouseHoldProfileApi.middleware), // Add household profile API middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
