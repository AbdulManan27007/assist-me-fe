// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
//   tagTypes: ['Listings', 'Users'],
//   endpoints: (builder) => ({
//     getListings: builder.query({
//       query: () => 'api/listings',
//       providesTags: ['Listings'],
//     }),
//     getListingById: builder.query({
//       query: (id) => `api/listings/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Listings', id }],
//     }),
//     createListing: builder.mutation({
//       query: (newListing) => ({
//         url: 'api/listings',
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
//         },
//         body: newListing,
//       }),
//       invalidatesTags: ['Listings'],
//     }),
//   }),
// });

// export const { useGetListingsQuery, useGetListingByIdQuery, useCreateListingMutation } = apiSlice;
