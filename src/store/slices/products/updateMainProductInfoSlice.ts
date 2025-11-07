import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdateMainProductInfo } from "./act/actUpdateMainProductInfo";

interface initialTypes {
  data: { title: string; description: string } | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const updateMainProductInfoSlice = createSlice({
  name: "updateMainProductInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdateMainProductInfo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateMainProductInfo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(actUpdateMainProductInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload ;
      });
  },
});

export default updateMainProductInfoSlice.reducer;
