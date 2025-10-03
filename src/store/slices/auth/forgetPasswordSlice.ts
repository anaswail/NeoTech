import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actForgetPassword } from "./act/actForgetPassword";

export interface IForgetPassword {
  email: string | null;
  message: string;
}

interface InitialTypes {
  data: IForgetPassword | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: InitialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actForgetPassword.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actForgetPassword.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actForgetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default forgetPasswordSlice.reducer;
