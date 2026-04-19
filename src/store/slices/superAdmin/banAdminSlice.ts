import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actBanAdmin } from "./act/actBanAdmin";

interface IBanAdminData {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface IInitialTypeBan {
  data: IBanAdminData | null | string;
  loading: "idle" | "rejected" | "pending" | "fulfilled";
  error: any;
}

const initialState: IInitialTypeBan = {
  data: null,
  loading: "idle",
  error: null,
};

const banAdminSlice = createSlice({
  name: "banUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actBanAdmin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actBanAdmin.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actBanAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default banAdminSlice.reducer;
