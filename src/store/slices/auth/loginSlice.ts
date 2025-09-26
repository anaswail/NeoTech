import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actLogin } from "./act/actLogin";
import type { ILoginUser } from "@/types";

interface IAuthLogin {
  user: ILoginUser | null;
  token: string | null;
}

interface authState {
  data: IAuthLogin;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}
const initialState: authState = {
  data: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  loading: "idle",
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        actLogin.fulfilled,
        (state, action: PayloadAction<IAuthLogin>) => {
          state.loading = "fulfilled";
          state.data.token = action.payload.token;
          state.data.user = action.payload.user;
          if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
          }
        }
      )
      .addCase(actLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
