import axiosApi from "@/axios/axiosApi";
import type { CreateOrderResponse, ICreateOrder, Order } from "@/types";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actCreateOrder = createAsyncThunk<Order, ICreateOrder>(
  "orders/createOrder",
  async (orderData: ICreateOrder, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<CreateOrderResponse>(
        "/api/orders/new",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
