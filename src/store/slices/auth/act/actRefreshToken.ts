import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "@/axios/axiosApi";

export const actRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "api/auth/refresh-token",
        {},
        { withCredentials: true },
      );

      const newToken = response.headers.authorization.replace("Bearer ", "");
      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  },
);
