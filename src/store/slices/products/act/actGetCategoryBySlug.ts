import axiosApi from "@/axios/axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetCategoryBySlug = createAsyncThunk(
  "product/getByCategory",
  async ({ slug }: { slug: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`api/products/category/${slug}`);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
