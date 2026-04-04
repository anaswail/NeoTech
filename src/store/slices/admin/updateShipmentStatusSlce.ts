import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdateShipmentStatus } from "./act/actUpdateShipmentStatus";

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

const updateShipmentStatusSlice = createSlice({
  name: "updateShipmentStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdateShipmentStatus.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateShipmentStatus.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(
        actUpdateShipmentStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default updateShipmentStatusSlice.reducer;
