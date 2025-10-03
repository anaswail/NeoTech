import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { newPassword, token }: { newPassword: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/auth/reset-password?token=${token}`,
        {
          newPassword,
          confirmPassword: newPassword,
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
