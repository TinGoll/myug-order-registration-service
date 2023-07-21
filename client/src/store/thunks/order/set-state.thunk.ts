import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $axios from "../../../axios";
import { OrderState } from "../../../enums/order-state.enum";

export const setStateThunk = createAsyncThunk<
  { state: OrderState },
  { state: OrderState; id: number },
  { rejectValue: AxiosError }
>("order/set-state", async (body, { rejectWithValue }) => {
  try {
    const responce = await $axios.post<{ state: OrderState }>("orders/state/" + body.id, body);
    const data = responce.data;

    return data;
  } catch (error) {
    console.log("AxiosError", error);

    return rejectWithValue(error as AxiosError);
  }
});
