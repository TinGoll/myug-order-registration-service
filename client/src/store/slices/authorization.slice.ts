import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PersonTypes from "../../types/person-types";

interface State {
  person: PersonTypes.Person | null;
  token?: string | null;
  authorized: boolean;
}

const initialState: State = {
  person: null,
  token: null,
  authorized: false,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const {} = authorizationSlice.actions;
export default authorizationSlice.reducer;
