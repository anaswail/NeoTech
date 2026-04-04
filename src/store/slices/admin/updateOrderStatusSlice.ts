import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdateOrderStatus } from "./act/actUpdateOrderStatus";

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

const updateOrderStatusSlice = createSlice({
  name: "updateOrderStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdateOrderStatus.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(
        actUpdateOrderStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default updateOrderStatusSlice.reducer;
