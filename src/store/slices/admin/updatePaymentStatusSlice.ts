import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdatePaymentStatus } from "./act/actUpdatePaymentStatus";

interface InitialType {
  data: null | any;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string;
}

const initialState: InitialType = {
  data: null,
  loading: "idle",
  error: null,
};

const updatePaymentStatusSlice = createSlice({
  name: "updatePaymentStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdatePaymentStatus.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdatePaymentStatus.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(
        actUpdatePaymentStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default updatePaymentStatusSlice.reducer;
