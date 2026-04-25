import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";

export const actRefundRequest = createAsyncThunk(
  "orders/refundRequest",
  async (
    {
      reason,
      amount,
      orderId,
    }: { reason: string; amount: number; orderId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.post(
        `/api/orders/${orderId}/cancel`,
        {
          reason,
          amount,
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
