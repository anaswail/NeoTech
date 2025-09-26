import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actGetMyProfile } from "./act/actGetMyProfile";

export interface IProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  provider: string;
  isEmailVerified: boolean;
}

interface initialTypes {
  data: IProfile[] | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetMyProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetMyProfile.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        localStorage.setItem("user", action.payload);
      })
      .addCase(
        actGetMyProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default profileSlice.reducer;
