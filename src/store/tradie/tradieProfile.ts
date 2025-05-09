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
  author_role: string;
  comment: string;
  created_at: string;
  household_id: number;
  household_name: string;
  id: number;
  tradie_id: number;
  rating: number;
  updated_at: string;
  household_image: string;
}

export interface TradieProfile {
  bio?: string | null;
  categoriesHired:string[];
  completed_jobs: number;
  experience?: string | null;
  id: number;
  listings: Listing[];
  phoneNumber: string;
  reviews: Review[];
  tradiePicture?: string | null;
  userId: number;
  pending_jobs?: number;
  skills: string[] | [];
  averageTaskRating: string;
  start_date?: Date;
  end_date?: Date
  availability: {
    start_date: Date;
    end_date: Date;
  };
}

export const TradieProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTradieProfile: builder.query<TradieProfile, string>({
      query: (userId) => `api/tradie/${userId}`,
    }),
    getTradieDashboard: builder.query<any, string>({
      query: (tradieId) => `api/dashboard/tradie/${tradieId}`,
    }),
  }),
});

export const { useGetTradieProfileQuery, useGetTradieDashboardQuery } = TradieProfileApi;
