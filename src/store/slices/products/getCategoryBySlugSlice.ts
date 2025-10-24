import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actGetCategoryBySlug } from "./act/actGetCategoryBySlug";
import type { CategoryData } from "@/types";

interface InitialTypes {
  data: CategoryData | null;
  loading: "idle" | "pending" | "rejected" | "fulfilled";
  error: string | null | any;
}

const initialState: InitialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const getCategoryBySlugSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (action) => {
    action
      .addCase(actGetCategoryBySlug.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCategoryBySlug.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(
        actGetCategoryBySlug.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default getCategoryBySlugSlice.reducer;
