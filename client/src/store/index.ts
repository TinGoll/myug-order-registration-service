import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import settingSlice from "./slices/settingSlice";

const store = configureStore({
  reducer: {
    settings: settingSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
