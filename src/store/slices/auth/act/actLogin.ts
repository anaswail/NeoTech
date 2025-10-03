import type { ILoginUser } from "@/types";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actLogin = createAsyncThunk(
  "auth/login",
  async (
    { password, email }: { password: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",

            // authorization: `Bearer ${userToken}`,
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
