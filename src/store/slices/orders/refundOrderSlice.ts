import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actRefundRequest } from "./act/actRefundRequest";

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

const refundOrderSlice = createSlice({
  name: "refundOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actRefundRequest.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actRefundRequest.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actRefundRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default refundOrderSlice.reducer;
