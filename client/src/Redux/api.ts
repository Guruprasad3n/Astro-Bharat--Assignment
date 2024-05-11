import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AstrologerInput {
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  image: string;
}

export interface AstrologerUpdateInput extends AstrologerInput {
  id: string | undefined;
}

export interface Astrologer {
  _id: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialties: string[];
  profileImageUrl?: string;
}

export const astrologersApi : any = createApi({
  reducerPath: "astrologersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://project-w3wa.onrender.com/api/astrologer",
  }),
  tagTypes: ["Astrologers"],
  endpoints: (builder) => ({
    getAstrologers: builder.query<Astrologer[], void>({
      query: () => "/",
      providesTags: ["Astrologers"],
    }),
    addAstrologer: builder.mutation<void, AstrologerInput>({
      query: (astrologer) => ({
        url: "/register",
        method: "POST",
        body: astrologer,
      }),
      invalidatesTags: ["Astrologers"],
    }),
    updateAstrologer: builder.mutation<void, AstrologerUpdateInput>({
      query: (astrologerUpdate) => ({
        url: `/${astrologerUpdate.id}`,
        method: "PUT",
        body: astrologerUpdate,
      }),
    }),
  }),
});

export const {
  useGetAstrologersQuery,
  useAddAstrologerMutation,
  useUpdateAstrologerMutation,
} = astrologersApi;