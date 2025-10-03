import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actResetPassword } from "./act/actResetPassword";

interface IResetPassword {
  newPassword: string;
  message: string;
}

interface InitialTypes {
  data: IResetPassword | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: InitialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actResetPassword.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actResetPassword.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default resetPasswordSlice.reducer;
