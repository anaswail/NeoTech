import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actBanUsers } from "./act/actBanUsers";

interface IBanUserData {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface IInitialTypeBan {
  data: IBanUserData | null | string;
  loading: "idle" | "rejected" | "pending" | "fulfilled";
  error: any;
}

const initialState: IInitialTypeBan = {
  data: null,
  loading: "idle",
  error: null,
};

const banUsersSlice = createSlice({
  name: "banUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actBanUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actBanUsers.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(actBanUsers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default banUsersSlice.reducer;
