import { RootState } from "@redux-store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterTypes } from "@utils/types";

// declaring the types for our state
export type CounterState = {
  search: string;
  filters: string | null;
  cont: string | null;
};

const initialState: CounterState = {
  search: "beef",
  filters: "",
  cont: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload ?? "beef";
    },
    setFilter: (state, action: PayloadAction<FilterTypes>) => {
      const diet = action.payload.diet.map((value) => `diet=${value}`);
      const mealType = action.payload.mealType.map(
        (value) => `mealType=${value}`
      );
      const health = action.payload.health.map((value) => `health=${value}`);
      state.filters = diet.concat(mealType).concat(health).join("&");
    },
    setNextPage: (state, action: PayloadAction<string>) => {
      state.cont = action.payload ?? "";
    },
  },
});

// actions
export const { setSearch, setFilter, setNextPage } = querySlice.actions;
// selectors
export const selectSearch = (state: RootState) => state.query.search;
export const selectFilter = (state: RootState) => state.query.filters;
export const selectNextPage = (state: RootState) => state.query.cont;

export default querySlice.reducer;
