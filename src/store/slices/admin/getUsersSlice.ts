import { createSlice } from "@reduxjs/toolkit";
import { actGetUsers } from "./act/actGetUsers";
import type { IUserData, AsyncState } from "@/types";

type GetUsersState = AsyncState<IUserData>;

const initialState: GetUsersState = {
  data: null,
  loading: "idle",
  error: null,
};
const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetUsers.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(actGetUsers.rejected, (state, action) => {
        state.loading = "rejected";
        state.error =
          action.payload || action.error.message || "Something went wrong";
      });
  },
});

export default getUsersSlice.reducer;
