import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actRegister } from "./actRegister";
import type { IRegisterUser } from "@/types";

interface IAuthRegister {
  user: IRegisterUser | null;
  token: string | null;
}
interface authState {
  data: IAuthRegister;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
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
    logOut: (state) => {
      state.data.user = null;
      state.data.token = null;
      localStorage.removeItem("token");
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
