import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PersonTypes from "../../types/person-types";
import { loginThunk } from "../thunks/auth/login.thunk";
import { tokenVerificationThunk } from "../thunks/auth/token-verification.thunk";
import { registrationThunk } from "../thunks/auth/registration.thunk";
import { BEARER_TOKEN_KEY } from "../../axios";

interface State {
  person: PersonTypes.Person | null;
  token?: string | null;
  authorized: boolean;
  loadind: boolean;
  error: string | null;
}

const initialState: State = {
  person: null,
  token: null,
  authorized: false,
  loadind: false,
  error: null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<void>) => {
      state.authorized = false;
      state.person = null;
      state.token = null;
      localStorage.removeItem(BEARER_TOKEN_KEY);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registrationThunk.pending, (state, action) => {
        state.error = null;
        state.loadind = true;
      })
      .addCase(registrationThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loadind = false;
        state.person = action.payload.person;
        state.token = action.payload.token;
        state.authorized = true;
      })
      .addCase(registrationThunk.rejected, (state, action) => {
        state.error = "Ошибка регистрации пользовтаеля.";
        state.loadind = false;
        state.person = null;
        state.token = null;
        state.authorized = false;
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.error = null;
        state.loadind = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loadind = false;
        state.person = action.payload.person;
        state.token = action.payload.token;
        state.authorized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = "Неправильное имя пользователя или пароль.";
        state.loadind = false;
        state.person = null;
        state.token = null;
        state.authorized = false;
      })
      .addCase(tokenVerificationThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loadind = false;
        state.person = action.payload.person;
        state.token = action.payload.token;
        state.authorized = true;
      });
  },
});

export const { logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;
