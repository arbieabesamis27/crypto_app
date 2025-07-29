import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CoinHistory,
  CoinsResponse,
  CryptoDetails,
  CryptoHistoryArgs,
  ExchangesResponse,
} from "./types";

const cryptoApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_APP_CRYPTO_RAPIDAPI_HOST,
};

const baseUrl = import.meta.env.VITE_APP_CRYPTO_API_URL;

const createRequest = (url: string) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<CoinsResponse, Number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<CryptoDetails, String | undefined>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<CoinHistory, CryptoHistoryArgs>({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
    getExchanges: builder.query<ExchangesResponse, void>({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
