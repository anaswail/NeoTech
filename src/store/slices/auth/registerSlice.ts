import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actRegister } from "./act/actRegister";
import type { IRegisterUser } from "@/types";

interface IAuthRegister {
  user: IRegisterUser | null;
  token: string | null;
  message?: string;
}
interface authState {
  data: IAuthRegister;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: authState = {
  data: { user: null, token: localStorage.getItem("token") || null },
  loading: "idle",
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    logout: (state) => {
      state.data.user = null;
      state.data.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        actRegister.fulfilled,
        (state, action: PayloadAction<IAuthRegister>) => {
          state.loading = "fulfilled";
          state.data.user = action.payload.user;
          state.data.token = action.payload.token;

          if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
          }
        }
      )
      .addCase(actRegister.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
export const { logout } = registerSlice.actions;
