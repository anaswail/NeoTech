// actUpdateVariations.ts
import axiosApi from "@/axios/axiosApi";
import { productId, userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actUpdateVariations = createAsyncThunk(
  "products/updateVariations",
  async (variationData: any, { rejectWithValue }) => {
    try {
      const { sku, ...updateData } = variationData;

      const response = await axiosApi.patch(
        `/api/admin/products/${productId}/variations/${sku}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);
