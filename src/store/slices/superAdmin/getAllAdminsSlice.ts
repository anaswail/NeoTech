import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actGetAllAdmins } from "./act/actGetAllAdmins";
import type { IGetAllAdminsResponse } from "@/types";

interface IGetAllAdminsState {
  data: IGetAllAdminsResponse | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: IGetAllAdminsState = {
  data: null,
  loading: "idle",
  error: null,
};

const getAllAdminsSlice = createSlice({
  name: "getAllAdmins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetAllAdmins.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetAllAdmins.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actGetAllAdmins.rejected,
        (state, action: PayloadAction<string | any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default getAllAdminsSlice.reducer;
