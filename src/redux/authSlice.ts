import { UserWithFavorite } from "@hooks/auth/useAuth";
import { RootState } from "@redux-store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterTypes } from "@utils/types";

// declaring the types for our state
export type CounterState = {
  user: UserWithFavorite | null;
};

const initialState: CounterState = {
  user: null,
};

export const querySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserWithFavorite>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// actions
export const { setUser, clearUser } = querySlice.actions;
// selectors
export const selectUser = (state: RootState) => state.auth.user;

export default querySlice.reducer;
