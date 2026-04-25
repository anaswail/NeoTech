import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";

export const actCancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (
    { reason, orderId }: { reason: string; orderId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.post(
        `/api/orders/${orderId}/cancel`,
        {
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
