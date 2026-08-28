import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  sort: "featured",
  minPrice: 0,
  maxPrice: 0,
  rating: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = Number(action.payload) || 0;
    },
    setMaxPrice(state, action) {
      state.maxPrice = Number(action.payload) || 0;
    },
    setRating(state, action) {
      state.rating = Number(action.payload) || 0;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setSort,
  setMinPrice,
  setMaxPrice,
  setRating,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
