import type { Product } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { actGetProductById } from "./act/actGetProductById";

interface initialTypes {
  data: Product | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | any | string;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const getProductByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {},
  extraReducers: (action) => {
    action
      .addCase(actGetProductById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductById.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(actGetProductById.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default getProductByIdSlice.reducer;
