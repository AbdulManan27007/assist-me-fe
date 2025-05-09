import { baseApi } from "../api/baseApi";

export interface Listing {
  id: number;
  user_id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  images?: string[] | null;
  price_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status: string;
  hired_tradie_id?: number | null;
  location: string;
  completed: boolean;
  tasks: any[];
}

export interface Review {
  id: number;
  author_role: string;
  household_id: number;
  tradie_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface HouseholdProfile {
  id: number;
  userId: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalSpent: string;
  totalTradiesHired: number;
  averageTaskRating: string;
  typeOfHouse?: string | null;
  isOwned: boolean;
  ownershipType?: string | null;
  additionalInfo?: string | null;
  listings: Listing[];
  reviews: Review[];
}

export const HouseHoldProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHouseholdProfile: builder.query<HouseholdProfile, string>({
      query: (userId) => `api/household/${userId}`, // Fixed string interpolation
    }),
  }),
});

export const { useGetHouseholdProfileQuery, useLazyGetHouseholdProfileQuery } =
  HouseHoldProfileApi;
