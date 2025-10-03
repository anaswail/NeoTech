import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actResendEmailVerification = createAsyncThunk(
  "auth/actResendEmailVerification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verification/resend-verification",
        _,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
