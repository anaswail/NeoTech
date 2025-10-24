import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actAddProduct } from "./act/actAddProduct";

interface initialTypes {
  data: FormData | null;
  loading: "idle" | "pending" | "rejected" | "fulfilled";
  error: string | null;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const addProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {},
  extraReducers: (action) => {
    action
      .addCase(actAddProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddProduct.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actAddProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});
