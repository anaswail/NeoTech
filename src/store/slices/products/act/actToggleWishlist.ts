import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actToggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",

  async (
    { productId }: { productId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.patch(
        "api/wishlist/toggle",
        { productId },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
