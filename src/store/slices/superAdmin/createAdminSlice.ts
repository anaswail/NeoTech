import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actCreateAdmin } from "./act/actCreateAdmin";
import type { IRegisterUser } from "@/types";

interface IAuthCreateAdmin {
  user: IRegisterUser | null;
  message?: string;
}
interface authState {
  data: IAuthCreateAdmin;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: authState = {
  data: { user: null },
  loading: "idle",
  error: null,
};

const createAdminSlice = createSlice({
  name: "createAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actCreateAdmin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        actCreateAdmin.fulfilled,
        (state, action: PayloadAction<IAuthCreateAdmin>) => {
          state.loading = "fulfilled";
          state.data.user = action.payload.user;
        },
      )
      .addCase(actCreateAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default createAdminSlice.reducer;
