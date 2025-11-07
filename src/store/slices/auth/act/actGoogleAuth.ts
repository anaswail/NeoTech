import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "@/axios/axiosApi";

export const actGoogleAuth = createAsyncThunk(
  "auth/google",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api/auth/social/google");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
