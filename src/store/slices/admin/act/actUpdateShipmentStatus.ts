import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IShipmentStatus {
  status:
    | "pending"
    | "shipped"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "delayed"
    | "returned";
}

export const actUpdateShipmentStatus = createAsyncThunk(
  "admin/updateShipmentStatus",
  async (
    { orderId, status }: { orderId: string; status: IShipmentStatus["status"] },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.patch(
        `/api/orders/admin/orders/${orderId}/shipment-status`,
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
