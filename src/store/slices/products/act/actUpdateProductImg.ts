import axiosApi from "@/axios/axiosApi";
import { productId, userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actUpdateProductImg = createAsyncThunk(
  "products/updateProductImg",
  async ({ images }: { images: FormData }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(
        `api/admin/products/${productId}/images`,
        images,
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
