import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actGetMyProfile } from "./act/actGetMyProfile";

export interface IProfile {
  id: string;
  email: string;
  name: string;
  avatar: {
    secure_url: string | null;
    public_id: string | null;
  };
  role: string;
  provider: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

interface initialTypes {
  data: IProfile | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: initialTypes = {
  data: JSON.parse(localStorage.getItem("user") || "null"),
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
        localStorage.setItem("user", JSON.stringify(action.payload));
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
