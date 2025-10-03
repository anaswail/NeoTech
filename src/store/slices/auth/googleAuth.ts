import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actGoogleAuth } from "./act/actGoogleAuth";

const initialState = {
  data: null,
  loading: "idle",
  error: null,
};

const googleAuth = createSlice({
  name: "google",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGoogleAuth.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGoogleAuth.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actGoogleAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default googleAuth.reducer;
