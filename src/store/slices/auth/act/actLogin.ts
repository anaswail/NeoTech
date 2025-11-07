import axiosApi from "@/axios/axiosApi";
import type { ILoginUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actLogin = createAsyncThunk(
  "auth/login",
  async (
    { password, email }: { password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosApi.post(
        "api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.headers["authorization"];

      return { user: response.data as ILoginUser, token };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
