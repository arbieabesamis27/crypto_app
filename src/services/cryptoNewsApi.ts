import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewsResponse } from "./types";

const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_APP_NEWS_RAPIDAPI_HOST,
};

const baseUrl = import.meta.env.VITE_APP_NEWS_API_URL;

const createRequest = (url: string) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<NewsResponse, String>({
      query: (newsCategory) =>
        createRequest(`/search?keyword=${newsCategory}&lr=en-US`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
