import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import orderSlice from "./slices/order.slice";
import authorizationSlice from "./slices/authorization.slice";
import { hdbkAPI } from "./api/hdbk.api";

const rootReducer = combineReducers({
  orderForm: orderSlice,
  authorization: authorizationSlice,
  [hdbkAPI.reducerPath]: hdbkAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(hdbkAPI.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
