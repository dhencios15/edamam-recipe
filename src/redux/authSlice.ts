import { UserWithFavorite } from "@hooks/auth/useAuth";
import { RootState } from "@redux-store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterTypes } from "@utils/types";
import { isEmpty } from "lodash";

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
export const selectUsersFavorites = (state: RootState) => {
  if (!isEmpty(state.auth.user?.favorites)) {
    return state.auth.user?.favorites.map((favorite) => favorite.recipeId);
  }
  return [];
};
export const selectRole = (state: RootState) =>
  state.auth.user?.role ?? "NORMAL";

export default querySlice.reducer;
