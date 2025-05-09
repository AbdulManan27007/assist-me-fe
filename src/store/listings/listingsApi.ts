import { baseApi } from "../api/baseApi";
import { Listing , Service } from "./listingTypes"; 

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<Listing[], void>({
      query: () => "api/listings",
    }),
    //create listing
    createListing: builder.mutation<void, Partial<Listing>>({
      query: (newListing) => ({
        url: "api/listings",
        method: "POST",
        body: newListing,
      }),
    }),
//create service
    createService: builder.mutation<void, Partial<Service>>({
      query: (newService) => ({
        url: "api/service",
        method: "POST",
        body: newService,
      }),
    }),

    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "s3/upload",
        method: "POST",
        body: formData,
      }),
    }),
    
    getUploadUrl: builder.mutation<{ url: string; downloadUrl: string }, { contentType: string; folder: string }>({
      query: (imageDetails) => ({
        url: "s3/upload-url",
        method: "POST",
        body: imageDetails,
      }),
    }),
  }),
});

export const { useGetListingsQuery, useUploadFileMutation,useCreateServiceMutation, useCreateListingMutation, useLazyGetListingsQuery, useGetUploadUrlMutation, } = listingsApi;
