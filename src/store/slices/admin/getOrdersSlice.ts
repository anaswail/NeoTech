import { createSlice } from "@reduxjs/toolkit";
import { actGetOrders } from "./act/actGetOrders";
import { type GetOrdersData, type AsyncState } from "../../../types";

type GetOrdersState = AsyncState<GetOrdersData>;

const initialState: GetOrdersState = {
  data: null,
  loading: "idle",
  error: null,
};

const getOrderSlice = createSlice({
  name: "getOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetOrders.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(actGetOrders.rejected, (state, action) => {
        state.loading = "rejected";
        state.error =
          action.payload || action.error.message || "Something went wrong";
      });
  },
});

export default getOrderSlice.reducer;
