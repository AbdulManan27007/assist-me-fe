import { baseApi } from "../api/baseApi";

export interface SingleListing {
  id: number;
  user_id: number;
  title: string;
  category: string;
  description: string;
  price: string; // Keeping it as string since API returns it as "100.50"
  images: string[] | null;
  price_type: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  status: "open" | "completed"; // Assuming status has these two possible values
  hired_tradie_id: number | null;
  location: string;
  completed: boolean;
  priceType?: string;
  hiredTradie?:any;
  nextTask?:string;
}

interface ListingsData {
  active: SingleListing[];
  inactive: SingleListing[];
}


interface ListingsState {
  activeListings: SingleListing[];
  inactiveListings: SingleListing[];
  totalListings: number;
  last30DaysPercentage: string;
  activeListingsCount: number;
  last7DaysActivePercentage: string;
  inactiveListingsCount: number;
  last7DaysInactivePercentage: string;
  last30DaysListings: number;
  last7DaysPercentage: string;
  listings:ListingsData;
}

const initialState: ListingsState = {
  activeListings: [],
  inactiveListings: [],
  totalListings: 0,
  last30DaysPercentage: "0",
  activeListingsCount: 0,
  last7DaysActivePercentage: "0",
  inactiveListingsCount: 0,
  last7DaysInactivePercentage: "0",
  last30DaysListings: 0,
  last7DaysPercentage: "0",
  listings: {
    active: [],
    inactive: [],
  },
};

export const listingsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getListings: builder.query<
      ListingsState,
      { page?: number; limit?: number; sortBy?: string; sortOrder?: string }
    >({
      query: ({ page = 1, limit, sortBy = "id", sortOrder = "asc" }) => {
        const params = new URLSearchParams({
          page: String(page),
          sortBy,
          sortOrder,
        });

        if (limit !== undefined) {
          params.append("limit", String(limit));
        }

        return {
          url: `api/listings?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Listings", id: "LIST" }],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // dispatch(setListings(data));
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      },
    }),

    getListingById: builder.query<SingleListing, number>({
      query: (id) => `api/listings/${id}`,
      providesTags: (result, error, id) => [{ type: "Listings", id }],
    }),

    createListing: builder.mutation<SingleListing, Partial<SingleListing>>({
      query: (newListing) => ({
        url: "api/listings",
        method: "POST",
        body: newListing,
      }),
      invalidatesTags: [{ type: "Listings", id: "LIST" }],
    }),

    updateListing: builder.mutation<SingleListing, { id: number; listing: Partial<SingleListing> }>({
      query: ({ id, listing }) => ({
        url: `api/listings/${id}`,
        method: "PUT",
        body: listing,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Listings", id }],
    }),

    deleteListing: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Listings", id: "LIST" }],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useLazyGetListingsQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
} = listingsApi;