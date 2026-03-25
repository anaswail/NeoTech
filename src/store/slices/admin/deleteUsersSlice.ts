import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actDeleteUser } from "./act/actDeleteUser";
import type { BanUserState } from "@/types";

const initialState: BanUserState = {
  data: null,
  loading: "idle",
  error: null,
};

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actDeleteUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDeleteUser.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actDeleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default deleteUserSlice.reducer;
