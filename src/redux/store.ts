import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import queryReducer from "@components/home/home.store/querySlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    query: queryReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
