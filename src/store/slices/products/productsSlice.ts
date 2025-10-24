import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/types";
import { actFetchProducts } from "./act/actProducts";

interface initialTypes {
  data: Product[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  currentPage?: number;
  totalPages?: number;
  totalProducts?: number;
}

const initialState: initialTypes = {
  data: [],
  loading: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalProducts: 10,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actFetchProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actFetchProducts.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data.products;
        state.currentPage = action.payload.data.pagination.currentPage;
        state.totalPages = action.payload.data.pagination.totalPages;
        state.totalProducts = action.payload.data.pagination.totalProducts;
      })
      .addCase(actFetchProducts.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
