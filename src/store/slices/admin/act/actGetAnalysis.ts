import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetAnalysis = createAsyncThunk(
  "admin/getAnalysis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api/admin/dashboard/analysis", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
