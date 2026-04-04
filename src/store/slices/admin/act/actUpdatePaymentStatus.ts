import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IPaymentStatus {
  status:
    | "pending"
    | "completed"
    | "failed"
    | "refunded"
    | "partially_refunded";
}

export const actUpdatePaymentStatus = createAsyncThunk(
  "admin/updatePaymentStatus",
  async (
    { orderId, status }: { orderId: string; status: IPaymentStatus["status"] },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.patch(
        `/api/orders/admin/orders/${orderId}/payment-status`,
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
