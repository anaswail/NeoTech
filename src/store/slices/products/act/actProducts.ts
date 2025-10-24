// src/store/slices/products/act/actProducts.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { productsType } from "@/types";
import axiosApi from "@/axios/axiosApi";

export const actFetchProducts = createAsyncThunk<
  productsType,
  { page?: number; limit?: number },
  { rejectValue: any }
>(
  "products/fetchProducts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get<productsType>(
        `api/products?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);
