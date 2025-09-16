import { createSlice } from "@reduxjs/toolkit";
import { actFetchProducts } from "./actProducts";
import type { productsType } from "@/types";

interface initialTypes {
  data: productsType[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: initialTypes = {
  data: [],
  loading: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actFetchProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actFetchProducts.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actFetchProducts.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
