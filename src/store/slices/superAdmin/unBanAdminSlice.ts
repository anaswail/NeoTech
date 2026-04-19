import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUnBanAdmin } from "./act/actUnBanAdmin";

interface IUnBanAdminData {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface IInitialTypeBan {
  data: IUnBanAdminData | null | string;
  loading: "idle" | "rejected" | "pending" | "fulfilled";
  error: any;
}

const initialState: IInitialTypeBan = {
  data: null,
  loading: "idle",
  error: null,
};

const unBanAdminSlice = createSlice({
  name: "banUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUnBanAdmin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUnBanAdmin.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actUnBanAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default unBanAdminSlice.reducer;
