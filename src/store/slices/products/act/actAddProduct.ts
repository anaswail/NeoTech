import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actAddProduct = createAsyncThunk(
  "product/newProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        "/api/admin/products/new",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
