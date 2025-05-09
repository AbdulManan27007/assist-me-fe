import { baseApi } from "../baseApi";

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "api/v1/file-upload/upload", 
        method: "POST",
        body: formData,
      }),
    }),
  }),
  
});

export const { useUploadImageMutation } = listingsApi;
