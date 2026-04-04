import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IOrderStatus {
  status:
    | "confirmed"
    | "processing"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "refunded";
}

export const actUpdateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async (
    { orderId, status }: { orderId: string; status: IOrderStatus["status"] },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.patch(
        `/api/orders/admin/orders/${orderId}/order-status`,
        { status },
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
