import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actDeleteProduct } from "./act/actDeleteProduct";

interface InitialTypes {
  data: null | any;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: InitialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actDeleteProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDeleteProduct.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(
        actDeleteProduct.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default deleteProductSlice.reducer;
