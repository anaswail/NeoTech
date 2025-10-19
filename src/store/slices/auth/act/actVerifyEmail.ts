import axiosApi from "@/axios/axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actVerifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `api/verification/verify-email/?token=${token}`
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
