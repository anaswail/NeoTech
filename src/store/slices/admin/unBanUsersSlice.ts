import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUnBanUsers } from "./act/actUnBanUsers";
import type { BanUserState } from "@/types";

const initialState: BanUserState = {
  data: null,
  loading: "idle",
  error: null,
};

const unBanUsersSlice = createSlice({
  name: "unBanUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUnBanUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUnBanUsers.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actUnBanUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default unBanUsersSlice.reducer;
