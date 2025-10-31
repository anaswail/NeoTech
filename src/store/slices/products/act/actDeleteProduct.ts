import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actDeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(
        `/api/admin/products/${productId}?permanent=true`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
