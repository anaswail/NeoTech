import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actDeleteAdmin } from "./act/actDeleteAdmin";
import type { BanUserState } from "@/types";

const initialState: BanUserState = {
  data: null,
  loading: "idle",
  error: null,
};

const deleteAdminSlice = createSlice({
  name: "deleteAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actDeleteAdmin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDeleteAdmin.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actDeleteAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default deleteAdminSlice.reducer;
