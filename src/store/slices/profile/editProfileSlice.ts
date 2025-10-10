import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actEditProfile, type IEditProfile } from "./act/actEditProfile";
import { actEditEmail } from "./act/actEditEmail";

interface IInitialType {
  data: IEditProfile | null | string;
  loading: "idle" | "rejected" | "pending" | "fulfilled";
  error: string | null;
}

const initialState: IInitialType = {
  data: null,
  loading: "idle",
  error: null,
};

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actEditProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actEditProfile.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actEditProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      })

      .addCase(actEditEmail.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actEditEmail.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actEditEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default editProfileSlice.reducer;
