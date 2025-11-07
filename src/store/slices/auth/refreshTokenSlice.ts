import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actRefreshToken } from "./act/actRefreshToken";

interface InitialType {
  data: Object | null;
  loading: "idle" | "rejected" | "fulfilled" | "pending";
  error: null | string | any;
  lastRefreshed?: number | null;
}

const initialState: InitialType = {
  data: null,
  loading: "idle",
  error: null,
  lastRefreshed: null,
};

const refreshToken = createSlice({
  name: "refreshToken",
  initialState,
  reducers: {
    resetRefreshToken: (state) => {
      state.data = null;
      state.loading = "idle";
      state.error = null;
      state.lastRefreshed = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actRefreshToken.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actRefreshToken.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        state.lastRefreshed = Date.now();
      })
      .addCase(
        actRefreshToken.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export const { resetRefreshToken } = refreshToken.actions;
export default refreshToken.reducer;
