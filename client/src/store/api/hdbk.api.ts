import { BaseQueryFn, createApi, FetchArgs } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../../axios/axiosBaseQuery";
import { AxiosError } from "axios";
import OrderTypes from "../../types/order-types";

export const hdbkAPI = createApi({
  reducerPath: "hdbkAPI",
  baseQuery: axiosBaseQuery({ baseUrl: "/hdbk" }) as BaseQueryFn<string | FetchArgs, unknown, AxiosError, {}>,
  tagTypes: ["hdbk"],
  endpoints: (build) => ({
    hdbk: build.query<OrderTypes.Hdbk, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useHdbkQuery, useLazyHdbkQuery } = hdbkAPI;

