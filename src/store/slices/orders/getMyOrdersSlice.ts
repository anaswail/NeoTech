import type { AsyncState, Order } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { actGetMyOrders } from "./act/actGetMyOrders";

type GetMyOrdersState = AsyncState<Order[]>;

const initialState: GetMyOrdersState = {
  data: null,
  loading: "idle",
  error: null,
};

const getMyOrdersSlice = createSlice({
  name: "getMyOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetMyOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetMyOrders.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actGetMyOrders.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default getMyOrdersSlice.reducer;
