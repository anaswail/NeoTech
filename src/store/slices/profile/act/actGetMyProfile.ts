import axiosApi from "@/axios/axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const actGetMyProfile = createAsyncThunk(
  "profile/MyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
