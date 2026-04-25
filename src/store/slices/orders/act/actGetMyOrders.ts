import axiosApi from "@/axios/axiosApi";
import type { Order } from "@/types";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetMyOrders = createAsyncThunk<Order[]>(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
