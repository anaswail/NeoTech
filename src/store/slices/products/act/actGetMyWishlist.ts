import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { WishlistResponse } from "@/types";

export const actGetMyWishlist = createAsyncThunk<
  WishlistResponse,
  void,
  { rejectValue: string }
>("wishlist/getMyWishlist", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get("api/wishlist", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data || "SomeThing went wrong");
  }
});
