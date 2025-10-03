import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actResendEmailVerification } from "./act/actResendEmailVerification";

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

const resendEmailVerificationSlice = createSlice({
  name: "resendEmailVerification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actResendEmailVerification.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actResendEmailVerification.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actResendEmailVerification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default resendEmailVerificationSlice.reducer;
