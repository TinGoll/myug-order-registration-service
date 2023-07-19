import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $axios from "../../../axios";
import OrderTypes from "../../../types/order-types";

export const orderSaveThunk = createAsyncThunk<OrderTypes.Order, OrderTypes.Order, { rejectValue: AxiosError }>(
  "order/processing",
  async (body, { rejectWithValue }) => {
    try {
      const responce = await $axios.post<OrderTypes.Order>("orders/processing", body);
      const data = responce.data;

      return data;
    } catch (error) {
      return rejectWithValue(error as AxiosError);
    }
  }
);
