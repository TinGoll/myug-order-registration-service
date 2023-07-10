import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import $axios, { BEARER_TOKEN_KEY } from "../../../axios";
import PersonTypes from "../../../types/person-types";

export const registrationThunk = createAsyncThunk<
  PersonTypes.LoginResponse,
  PersonTypes.RegistrationInput,
  { rejectValue: AxiosError }
>("auth/registration", async (body, { dispatch, rejectWithValue }) => {
  try {
    const responce = await $axios.post<PersonTypes.LoginResponse>("persons/registration", body);
    const data = responce.data;
    localStorage.setItem(BEARER_TOKEN_KEY, data.token);
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
