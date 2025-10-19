import axiosApi from "@/axios/axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetHomeData = createAsyncThunk(
  "products/home",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
