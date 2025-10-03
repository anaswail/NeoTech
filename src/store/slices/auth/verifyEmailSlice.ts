import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actVerifyEmail } from "./act/actVerifyEmail";

interface initialTypes {
  data: null | object;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: null | string | any;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actVerifyEmail.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actVerifyEmail.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actVerifyEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default verifyEmailSlice.reducer;
