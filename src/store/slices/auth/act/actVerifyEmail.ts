import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actVerifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/verification/verify-email/?token=${token}`
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
