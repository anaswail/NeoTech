import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actCancelOrder } from "./act/actCancelOrder";

interface IInitialType {
  data: { message: string } | null | string;
  loading: "idle" | "rejected" | "pending" | "fulfilled";
  error: string | null | any;
}

const initialState: IInitialType = {
  data: null,
  loading: "idle",
  error: null,
};

const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actCancelOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actCancelOrder.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actCancelOrder.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default cancelOrderSlice.reducer;
