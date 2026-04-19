import type { ICreateOrder } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { actCreateOrder } from "./act/actCreateOrder";

const Order: ICreateOrder = {
  items: null,
  shippingAddress: {
    name: null,
    companyName: null,
    streetAddress: null,
    city: null,
    phoneNumber: null,
    email: null,
  },
  paymentMethod: "credit_card",
  shippingCost: null,
};

interface InitialType {
  data: ICreateOrder;
  loading: "idle" | "pending" | "rejected" | "fulfilled";
  error: string | null;
}

const initialState: InitialType = {
  data: Order,
  loading: "idle",
  error: null,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actCreateOrder.pending, (state) => {
      state.loading;
    });
  },
});

export default createOrderSlice.reducer;
