import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $axios, { BEARER_TOKEN_KEY } from "../../../axios";
import PersonTypes from "../../../types/person-types";


export const tokenVerificationThunk = createAsyncThunk<
  PersonTypes.LoginResponse,
  PersonTypes.Verification,
  { rejectValue: AxiosError }
>("auth/verification", async (body, { dispatch, rejectWithValue }) => {
  try {
    const responce = await $axios.post<PersonTypes.LoginResponse>("persons/verification", body);
    const data = responce.data;
    localStorage.setItem(BEARER_TOKEN_KEY, data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error as AxiosError);
  }
});
