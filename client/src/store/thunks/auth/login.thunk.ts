import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import PersonTypes from "../../../types/person-types";
import $axios, { BEARER_TOKEN_KEY } from "../../../axios";

export const loginThunk = createAsyncThunk<
  PersonTypes.LoginResponse,
  PersonTypes.LoginInput,
  { rejectValue: AxiosError }
>("auth/login", async (body, { dispatch, rejectWithValue }) => {
  try {
    const responce = await $axios.post<PersonTypes.LoginResponse>("persons/login", body);
    const data = responce.data;
    localStorage.setItem(BEARER_TOKEN_KEY, data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});
