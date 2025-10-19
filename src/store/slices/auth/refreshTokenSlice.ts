import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actRefreshToken } from "./act/actRefreshToken";

interface InitialType {
  data: Object | null;
  loading: "idle" | "rejected" | "fulfilled" | "pending";
  error: null | string | any;
}

const initialState: InitialType = {
  data: null,
  loading: "idle",
  error: null,
};

const refreshToken = createSlice({
  name: "refreshToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actRefreshToken.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actRefreshToken.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
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

export default refreshToken.reducer;
