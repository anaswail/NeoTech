import axiosApi from "@/axios/axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetProductById = createAsyncThunk(
  "product/getById",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`api/products/${id}`);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
