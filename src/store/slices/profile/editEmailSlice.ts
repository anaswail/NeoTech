import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IEditProfile } from "./act/actEditProfile";
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

const editEmailSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default editEmailSlice.reducer;
